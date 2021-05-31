import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

// AUTHS
import Login from '../../presentation/pages/Login'
import SignUp from 'presentation/pages/SignUp'
import ForgotPassword from 'presentation/pages/auth/ForgotPassword';
import ResetPassword from 'presentation/pages/auth/ResetPassword';

// LAYOUTS
import TopAndSide from 'presentation/layouts/TopAndSide';

// DASHBOARD
import Plants from 'presentation/pages/dashboard/Plants';


const Routes: React.FC = () => (
  <Switch>
    {/* AUTHS */}
    <Route path="/" exact component={Login} />
    <Route path="/signup" exact component={SignUp} />
    <Route path="/forgotpassword" exact component={ForgotPassword} />
    <Route path="/resetpassword" exact component={ResetPassword} />
    {/* DASHBOARD */}
    <Route path="/dashboard/plants" exact>
      <TopAndSide>
        <Plants />
      </TopAndSide>
    </Route>
  </Switch>
)

export default Routes;