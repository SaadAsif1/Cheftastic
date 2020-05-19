import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/pages/Home/Home';
import Explore from './components/pages/Explore/Explore';
import Contact from './components/pages/Contact/Contact';

// Authentication Routes
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import Activate from './components/auth/Activate';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/explore' component={Explore} />
        <Route exact path='/contact' component={Contact} />

        {/* Authentication Routes */}
        <Route exact path='/sign-up' component={Signup} />
        <Route exact path='/sign-in' component={Signin} />
        <Route exact path='/auth/activate/:token' component={Activate} />
        <Route exact path='/forgot-password' component={ForgotPassword} />
        <Route exact path='/auth/password/reset/:token' component={ResetPassword} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
