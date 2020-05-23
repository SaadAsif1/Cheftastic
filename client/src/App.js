import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Private Route
import PrivateRoute from './PrivateRoute';

import Home from './components/pages/Home/Home';
import Explore from './components/pages/Explore/Explore';
import IndividualPost from './components/pages/IndividualPost/Post';
import Contact from './components/pages/Contact/Contact';

// Authentication Routes
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import Activate from './components/auth/Activate';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';

// Admin Page
import AdminHome from './components/pages/Admin/Home/Home';
import AdminSettings from './components/pages/Admin/Settings/Settings';
import AddPost from './components/pages/Admin/Home/AddPost';
import EditPost from './components/pages/Admin/Home/EditPost';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/explore' component={Explore} />
        <Route path='/post' component={IndividualPost} />
        <Route exact path='/contact' component={Contact} />

        {/* Authentication Routes */}
        <Route exact path='/sign-up' component={Signup} />
        <Route exact path='/sign-in' component={Signin} />
        <Route exact path='/auth/activate/:token' component={Activate} />
        <Route exact path='/forgot-password' component={ForgotPassword} />
        <Route exact path='/auth/password/reset/:token' component={ResetPassword} />

        {/* Private Route */}
        <PrivateRoute exact path='/admin/home' component={AdminHome} />
        <PrivateRoute exact path='/admin/home/add-post' component={AddPost} />
        <PrivateRoute path='/admin/home/edit' component={EditPost} />
        <PrivateRoute exact path='/admin/settings' component={AdminSettings} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
