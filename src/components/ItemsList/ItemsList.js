import React, {Component} from 'react';
import axios from 'axios';
import { Layout } from '../Layout';
import ItemsListTable from './ItemsListTable';

/**
 * ItemList Component to show the item listing.
 * Whole ItemList logic is divided into 2 components:
 * Class Component (For business logic)
 * Function Component (For all view related logic)
 */
export default class ItemsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items:[],
            filter:{
                name:''
            }
        };

        // Binding Methods
        this.removeItemsHandler = this.removeItemsHandler.bind(this);
        this.updateItemHandler = this.updateItemHandler.bind(this);
        this.resetItemsHandler = this.resetItemsHandler.bind(this);
        this.searchFilterInputChangeHandler = this.searchFilterInputChangeHandler.bind(this);
        this.debounceInputSearchHandler = this.debounceInputSearchHandler.bind(this);
    }

    async componentDidMount() {
        // Fetch the items data from JSON file using AXIOS GET Request
        await this.resetItemsHandler();
    }

    render() {
        return (
            <React.Fragment>
                <Layout>
                    <div className="mt-2">
                        <ItemsListTable data={this.state.items} onRemoveItems={this.removeItemsHandler} 
                            onUpdateItem={this.updateItemHandler} onResetItems={this.resetItemsHandler}
                            onSearch={this.searchFilterInputChangeHandler} filter={this.state.filter} />
                    </div>
                </Layout>
            </React.Fragment>
        );
    }

    async getItemsFromAPI() {
        // Get Data from JSON file(in public directory)
        // This API Endpoint can be replaced with original endpoint in final implementation
        const itemsApiEndpoint = "/api/items.json";
        const items = await axios.get(itemsApiEndpoint);
        return items.data.items;
    }

    /**
     * Remove selected items from item list
     * @param {*} itemsToRemoveIds Item IDs that have to be removed
     */
    removeItemsHandler(itemsToRemoveIds) {
        const filteredItems = this.state.items.filter((item) => !itemsToRemoveIds.includes(item.id));
        this.localItemsBackup = this.localItemsBackup.filter((item) => !itemsToRemoveIds.includes(item.id));
        this.setState({items:filteredItems});
    }

    /**
     * Reset Items by fetching them again from JSON input
     */
    async resetItemsHandler() {
        const items = await this.getItemsFromAPI();
        this.localItemsBackup = items;
        this.setState({items});
    }

    /**
     * Update Item in Item List
     * @param {*} itemId Id of Item that has to be updated
     * @param {*} fieldName Field name(ex: name, price etc) of item
     * @param {*} fieldValue Field value of item
     */
    updateItemHandler(itemId, fieldName, fieldValue) {
        const {items} = this.state;
        items.forEach((item) => {
            if (item.id === itemId) {
                item[fieldName] = fieldValue;
                return;
            }
        });
        this.setState({items});
    }

    /**
     * Handles input field change of filters, and call debounce function to update filtered list.
     * @param {*} fieldValue Field Value of filter which is updated
     * @param {*} fieldName Field name of filter that is updated
     */
    searchFilterInputChangeHandler(fieldValue, fieldName) {
        this.setState({filter:{...this.state.filter, [fieldName]:fieldValue}});
        this.debounceInputSearchHandler(fieldName, fieldValue);
    }

    /**
     * Implement Debounce functionality
     * @param {*} fieldName Fieldname on which filter is applied
     * @param {*} fieldValue Filter value
     * @param {*} debounceTimeout Timeout rate by which debounce should be applied
     */
    debounceInputSearchHandler(fieldName, fieldValue, debounceTimeout = 300) {
        if (this.debounceTimeoutInterval) {
            clearTimeout(this.debounceTimeoutInterval);
        }
        let inputValue = fieldValue;
        this.debounceTimeoutInterval = setTimeout(() => {
            if (inputValue.trim() !== "") {
                const filteredItems = this.state.items.filter((item) => item[fieldName].toLowerCase().includes(inputValue.toLowerCase()));
                this.setState({items:filteredItems});
            }
            else {
                this.setState({items:this.localItemsBackup});
            }
        }, debounceTimeout);
    }
}