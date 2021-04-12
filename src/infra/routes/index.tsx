import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from '../../presentation/pages/Login'
import SignUp from '../../presentation/pages/SignUp'

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/signup" exact component={SignUp} />
  </Switch>
)

export default Routes
