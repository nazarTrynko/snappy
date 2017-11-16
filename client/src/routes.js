import React from 'react';
import { Router, Route } from 'react-router';

import MainContainer from './containers/MainContainer';
import ShippingsView from './containers/ShippingsView';
import FormView from './containers/FormView';

const Routes = (props) => (
  <Router {...props}>
    <Route component={MainContainer}>
      <Route path="/" component={FormView} />
      <Route path="/shippings" component={ShippingsView} />
    </Route>
  </Router>
);

export default Routes;
