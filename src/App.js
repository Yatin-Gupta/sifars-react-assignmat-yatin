import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {ItemsList} from './components/ItemsList';

/**
 * Routing is implemented in App Component
 */
function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/" exact component={ItemsList} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
