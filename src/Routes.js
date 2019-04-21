import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ExampleList from './scenes/example/Example';
import NotFound from './scenes/NotFound';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ExampleList} />
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
