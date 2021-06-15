import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';

//TRATAMENTO DE SESSAO DE LOGIN
import { SessionData } from 'data/store/reducers';

//ROUTES
import Auth from './Auth';
import Administrator from './Administrator';

function Routes ({ session }: { session: SessionData }){

  function renderPageRoutes () {
    if(session.user.user_name !== 'nothing') {
      return Administrator;      
    }else{
      return Auth;
    }
  }
  return (
    <Route>
      {renderPageRoutes()}
    </Route>
  );
}

function mapStateToProps(state: any) {
  return {
    session: state.session,
  };
}

export default connect(mapStateToProps)(Routes);