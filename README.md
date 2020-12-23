## Sifars React Assignment

### Packages Used

Here listed all the packages used other than that default comes with **create-react-app**:

| Package Name     |               Description               |
| ---------------- | :-------------------------------------: |
| react-bootstrap  | To use bootstrap components in ReactJS. |
| bootstrap        |     Dependency for react-bootstrap.     |
| popper.js        |  Dependency for bootstrap javascript.   |
| jQuery           |        Dependency for bootstrap.        |
| node-sass        |      To write style rules in SCSS.      |
| react-jss        |      To write style rules in JSS.       |
| react-router-dom |    To implement Routing in React JS.    |
| axios            |   To request data from API Endpoint.    |

### Directory Structure

Here provided overview of important directories:

| Directory                |                               Description                               |
| ------------------------ | :---------------------------------------------------------------------: |
| src/components           |       All the components other than App components created here.        |
| src/components/ItemsList |     All files related to Listing Items functionality created here.      |
| src/components/Layout    |            All files related to Layout of page created here.            |
| src/components/shared    |   All the code related to reusable or shared components present here.   |
| src/assets               |         All the style rules are present here in this directory          |
| App.js                   | Component that calls all other components. Routing is implemented here. |
| public/api               |               JSON file to fetch items data present here                |
| public/images            |                      Site Logo image is added here                      |

### Project Functionality Implemented

- User can click on site logo to go back to home page. Tooltip will be shown to user on hovering logo, so that he can understand the same.
- User can view all the Items fetched from public JSON file.
- User can select/unselect multiple or all items.
- User can remove multiple items.
- User will be asked for confirmation before he can remove items.
- User can reset/refresh all the items. In case of Reset/Refresh items will be again fetched from JSON file and shown.
- User will be asked for confirmation before he can reset the items.
- User can update the price by clicking on price cell.
- User can either remove focus or press ENTER to update the price cell.
- User can search/filter items by name. Exact name and case is not required. User can search by substring and any case.
- As User empty the search field, all the items will be listed.
- Search is implemented using **Debouncing**, thus UI performance will not lack due to multiple filter request.

### Project Features

- AODA Practices are implemented wherever possible.
- Application is made Responsive
- JSS is used to set component specific style that other component cannot use.
- SCSS is used to create application level styles that any component can use.
- Normalize CSS is used to eliminate cross browser issues with different elements.
- Bootstrap Normalize CSS has high priority than our Normalize CSS(in index.css), but our SCSS(in App.scss) rules has high priority than Bootstrap rules.
- Debouncing is implemented for Searching.
- Application is Component Driven. Functionality is divided into different components. For example, ItemList business logic is implemented in class component(ItemsList.js), view logic in Function component(ItemsListTable.js) and reusable logic in shared components(components/shared)

### Screenshots

#### Complete App Screenshot

![Complete App Screenshot](https://github.com/Yatin-Gupta/sifars-react-assignmat-yatin/blob/master/screenshots/1-complete-app.PNG)

#### Select All Items Screenshot

![Select All Items Screenshot](https://github.com/Yatin-Gupta/sifars-react-assignmat-yatin/blob/master/screenshots/2-select-all-items.PNG)

#### Unselect few items Screenshot

![Unselect few items Screenshot](https://github.com/Yatin-Gupta/sifars-react-assignmat-yatin/blob/master/screenshots/3-unselect-few-items.PNG)

#### Remove Items Modal Screenshot

![Remove Items Modal Screenshot](https://github.com/Yatin-Gupta/sifars-react-assignmat-yatin/blob/master/screenshots/4-remove-items-modal.PNG)

#### Items Removed Screenshot

![Items Removed Screenshot](https://github.com/Yatin-Gupta/sifars-react-assignmat-yatin/blob/master/screenshots/5-items-removed.PNG)

#### Reset Items Modal Screenshot

![Reset Items Modal Screenshot](https://github.com/Yatin-Gupta/sifars-react-assignmat-yatin/blob/master/screenshots/6-reset-items-modal.PNG)

#### Items Reset And Tooltip on Hovering Logo Screenshot

![Items Reset And Tooltip on Hovering Logo Screenshot](https://github.com/Yatin-Gupta/sifars-react-assignmat-yatin/blob/master/screenshots/7-items-reset-and-hover-on-logo.png)

#### Search Item Screenshot

![Search Item Screenshot](https://github.com/Yatin-Gupta/sifars-react-assignmat-yatin/blob/master/screenshots/8-search-item-7.PNG)

#### Update Item Price Screenshot

![Update Item Price Screenshot](https://github.com/Yatin-Gupta/sifars-react-assignmat-yatin/blob/master/screenshots/9-update-price-to-1500-of-item-7.png)

#### Price Updated And Get all items when search is reset Screenshot

![Price Updated And Get all items when search is reset Screenshot](https://github.com/Yatin-Gupta/sifars-react-assignmat-yatin/blob/master/screenshots/10-price-updated-and-get-all-items-on-empty-search.png)

#### No Item Present Screenshot

![No Item Present Screenshot](https://github.com/Yatin-Gupta/sifars-react-assignmat-yatin/blob/master/screenshots/11-no-item-present.PNG)

#### Mobile View Screenshot

![Mobile View Screenshot](https://github.com/Yatin-Gupta/sifars-react-assignmat-yatin/blob/master/screenshots/12-mobile_(iPhone%20X).png)
