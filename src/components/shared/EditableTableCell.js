import React, {useEffect, useRef} from 'react';
import {createUseStyles} from 'react-jss';
import EditableTableCellStyle from './EditableTableCellStyle';

const userStyle = createUseStyles(EditableTableCellStyle);

/**
 * Component that will determine if table cell is editable and render accordingly
 * @param {*} props 
 */
export default function EditableTableCell(props) {
    const {editableFieldObj, itemId, fieldName, fieldValue, onColumnClick, onInputChange, onInputBlur} = props;
    const classes = userStyle();
    const inputRef = useRef(null);
    const isEditable = editableFieldObj.itemId === itemId && editableFieldObj.fieldName === fieldName;
    useEffect(() => {
        
        if (isEditable && editableFieldObj.fieldValue === fieldValue && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editableFieldObj, isEditable, fieldValue]);

    return (
        <React.Fragment>
            {
                isEditable ? 
                    // If Table cell is editable
                    <td className={classes.inputColumn}>
                        {/* 
                        onChange, onBlur, onKeyUp(for ENTER) events handled to make keyboard friendly site[AODA]
                        */}
                        <input name={`${itemId}_${fieldName}`} value={editableFieldObj.fieldValue} onChange={(e) => {
                            e.preventDefault();
                            onInputChange(itemId, fieldName, e.target.value);
                        }} onBlur={(e) => {
                            e.preventDefault();
                            onInputBlur();
                        }} onKeyUp={(evt) => {
                            evt.preventDefault();
                            if (evt.key.toLowerCase() === "enter") {
                                onInputBlur();
                            }
                        }} className={classes.input} ref={inputRef} autoComplete="off" />
                    </td>:
                    // If Table cell is not editable
                    <td onClick={(e) => {
                        e.preventDefault();
                        onColumnClick(itemId, fieldName, fieldValue);
                    }}>{fieldValue}</td>
            }
        </React.Fragment>
    );
}
