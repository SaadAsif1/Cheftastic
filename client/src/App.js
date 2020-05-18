import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/pages/Home/Home';
import Explore from './components/pages/Explore/Explore';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/explore' component={Explore} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
