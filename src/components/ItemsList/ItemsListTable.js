import React, {useState, useMemo} from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import {MessageModal, EditableTableCell} from '../shared';
import {createUseStyles} from 'react-jss';
import ItemsListStyle from './ItemsListStyle';

// Get JSS styles of ItemsList component
const styles = createUseStyles(ItemsListStyle);

/**
 * Component responsible to render ItemsListTable View
 * @param {*} props 
 */
export default function ItemsListTable(props) {
    const {data, onRemoveItems, onUpdateItem, onResetItems, filter, onSearch} = props;

    // Get Item Ids using memoized version, so that it should not be calculated in every render
    const itemIds = useMemo(() => data.map((item) => item.id), [data]);
    
    // Set States
    const [itemsSelected, setItemsSelected] = useState([]);
    const [editableFieldObj, setEditableFieldObj] = useState({itemId:null, fieldName:null, fieldValue:null});
    const [modal, setModal] = useState({show:false, onClose:() => setModal({...modal, show:false})});
    
    // Get JSS Style classes
    const styleClasses = styles();

    /**
     * Action performed when table cell is clicked. Set local state for editable field.
     * @param {*} itemId Item Id correspond to which table cell is clicked
     * @param {*} fieldName Field name correspond to which table cell is clicked
     * @param {*} fieldValue Field value of field name correspond to which table cell is clicked
     */
    function onColumnClick(itemId, fieldName, fieldValue) {        
        setEditableFieldObj({itemId, fieldName, fieldValue});
    }

    /**
     * Handle input change of editable table cell. Update local state corresponds to editable field.
     * @param {*} itemId Item Id correspond to which table cell value is updated
     * @param {*} fieldName Field name correspond to which table cell value is updated
     * @param {*} fieldValue Field value of field name correspond to which table cell value is updated
     */
    function onInputChange(itemId, fieldName, fieldValue) {
        setEditableFieldObj({itemId, fieldName, fieldValue});
    }

    /**
     * Handle input blur and ENTER of editable table cell. Update itemList(class component) state corresponds to editable field.
     */
    function onInputBlur() {
        if (editableFieldObj.itemId !== null) {
            onUpdateItem(editableFieldObj.itemId, editableFieldObj.fieldName, editableFieldObj.fieldValue);
            setEditableFieldObj({itemId:null, fieldName:null, fieldValue:null});
        }
    }

    return (
        <React.Fragment>
            {/* Modal shown for Remove/Reset Message  */}
            <MessageModal {...modal} />

            {/* Table Action Controls: Remove/Reset Buttons */}
            <div className="w-100 d-flex mb-1 mr-0" id="table-action-controls">
                <h1 className="h2 col-6 mb-0 pl-0 d-none d-sm-block">Items List</h1>
                <h1 className="h3 col-6 mb-0 pl-0 d-block d-sm-none">Items List</h1>
                <div className="col-6 d-flex justify-content-end align-items-end pr-0">
                    <Button variant="danger" className={`${styleClasses.tableControlButton}`} size='sm' onClick={(e) => {
                        e.preventDefault();
                        setModal({
                            ...modal,
                            show:true,
                            modalHeading:'Remove Items',
                            message:itemsSelected.length > 0 ?
                                `Are you sure you want to remove ${itemsSelected.length} item(s)?`:
                                'Please select item that has to be removed',
                            showActionControls:itemsSelected.length > 0?true:false,
                            actionBtnText: 'Remove',
                            actionBtnVariant:'danger',
                            actionBtnHandler:(evt) => {
                                evt.preventDefault();
                                onRemoveItems(itemsSelected);
                                setItemsSelected([]);
                            }
                        });
                    }}>Remove</Button>
                    <Button variant="primary" className={`ml-1 ${styleClasses.tableControlButton}`} size='sm' onClick={(e) => {
                        setModal({
                            ...modal,
                            show:true,
                            modalHeading:'Reset Item List',
                            message:`Are you sure you want to reset item list?`,
                            actionBtnText: 'Reset',
                            actionBtnVariant:'primary',
                            showActionControls:undefined,
                            actionBtnHandler:(evt) => {
                                evt.preventDefault();
                                onResetItems().then(() => {
                                    setItemsSelected([]);
                                });
                            }
                        });
                    }}>Reset</Button>
                </div>
            </div>
            <Table striped bordered hover responsive={'md'}>
                {/* Table Component */}
                <thead>
                    {/* Table Header */}
                    <tr>
                        <th>
                            <div className="w-100 d-flex justify-content-center align-items-center">
                                <Form.Check aria-label="Select All Items" checked={itemsSelected.length === itemIds.length} onChange={(evt) => {
                                    evt.target.checked?setItemsSelected([...itemIds]):setItemsSelected([]);
                                }} />
                            </div>
                        </th>
                        <th>ID</th>
                        <th className="d-flex flex-column">
                            <div className="d-flex w-100 align-items-end">
                                <span>Name</span>
                            </div>
                            <div className="w-100 p-0">
                                <input type="text" className={`m-0 w-100 ${styleClasses.searchInput}`} placeholder="Type name to filter items" value={filter.name} onChange={(e) => {
                                    e.preventDefault();
                                    onSearch(e.target.value, 'name');
                                }}/>
                            </div>
                        </th>
                        <th>Price</th>
                        <th>Coupon</th>
                        <th>In Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Table Body */}
                    {
                        data.length > 0 ? data.map((item) => (
                            <tr key={`${item.id}`} className={itemsSelected.includes(item.id)?'table-warning':''}>
                                <td>
                                <div className="w-100 d-flex justify-content-center align-items-center">
                                    {/* Checkbox Logic */}
                                    {/* aria-label added to help screen readers know purpose of checkbox[AODA] */}
                                    <Form.Check aria-label={`Select Item of name ${item.name} and id ${item.id}`} onChange={(evt) => {
                                        if (evt.target.checked) {
                                            itemsSelected.indexOf(item.id) === -1 && setItemsSelected([...itemsSelected, item.id]);
                                        }
                                        else {
                                            itemsSelected.indexOf(item.id) > -1 && itemsSelected.splice(itemsSelected.indexOf(item.id), 1);
                                            setItemsSelected([...itemsSelected]);
                                        }
                                    }} checked={itemsSelected.includes(item.id)} />
                                </div>
                                </td>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                {/* Editable Table Cell Shared Component */}
                                <EditableTableCell 
                                    editableFieldObj={editableFieldObj}
                                    itemId={item.id}
                                    fieldName={'price'}
                                    fieldValue={item.price}
                                    onColumnClick={onColumnClick}
                                    onInputChange={onInputChange}
                                    onInputBlur={onInputBlur}
                                />
                                <td>{item.coupon}</td>
                                <td>{item.inStock}</td>
                            </tr>
                        )):(
                            <tr>
                                {/* Displayed when no item exists in list */}
                                <td colSpan={6}>
                                    No Item in List
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </React.Fragment>
    );
}
