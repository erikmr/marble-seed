import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'

import tree from '~core/tree'
import Layout from '~components/layout'

import Home from './pages/home'
import About from './pages/about'
import SignUp from './pages/sign-up'
import LogIn from './pages/log-in'
import Profile from './pages/profile'
import EmailInviteLanding from './pages/emails/invited'
import EmailResetLanding from './pages/emails/reset'
import ResetPassword from './pages/reset-password'

import App from './pages/app'

const LoginRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={props => {
    if (tree.get('loggedIn')) {
      return <Redirect to={{
        pathname: '/app'
      }} />
    } else {
      return <Component {...props} />
    }
  }} />
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={props => {
    if (!tree.get('loggedIn')) {
      return <Redirect to={{
        pathname: '/log-in'
      }} />
    } else {
      return <Component {...props} />
    }
  }} />
}

const AppRouter = () => {
  return (<Router>
    <Layout>
      <div>
        <Route exact path='/' component={Home} />
        <Route exact path='/about' component={About} />
        <Route exact path='/emails/invite' component={EmailInviteLanding} />
        <Route exact path='/emails/reset' component={EmailResetLanding} />
        <Route exact path='/password/forgotten' component={ResetPassword} />
        <LoginRoute exact path='/sign-up' component={SignUp} />
        <LoginRoute exact path='/log-in' component={LogIn} />
        <PrivateRoute path='/app' component={App} />
        <PrivateRoute path='/profile' component={Profile} />
      </div>
    </Layout>
  </Router>)
}

export default AppRouter
