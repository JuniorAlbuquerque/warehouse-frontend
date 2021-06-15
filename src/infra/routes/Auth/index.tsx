import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from 'react-router-dom';

  // AUTHS
import Login from 'presentation/pages/Login'
import SignUp from 'presentation/pages/SignUp'
import ForgotPassword from 'presentation/pages/auth/ForgotPassword';
import EmailSent from 'presentation/pages/auth/EmailSent';
import ResetPassword from 'presentation/pages/auth/ResetPassword';
import ErrorPage from 'presentation/pages/auth/ErrorPage';

const Auth = () => {
    return(
        <Switch>    
            <Route path="/" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/forgotpassword" exact component={ForgotPassword} />
            <Route path="/emailsent" exact component={EmailSent} />    
            <Route path="/resetpassword/:token" exact component={ResetPassword} />
            <Route path="/errorpage" exact component={ErrorPage} />    
            <Redirect to='/' />
        </Switch>
    )
}

export default Auth;