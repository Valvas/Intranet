import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux'

import
{
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Lost from './lost/Lost';
import Home from './home/Home';
import Logon from './logon/Logon';
import ProtectedRoute from './ProtectedRoute';
import NotAuthenticatedRoute from './NotAuthenticatedRoute';

/****************************************************************************************************/

class App extends Component
{
  constructor(props)
  {
    super(props);

    //Uncomment to logout account
    //this.props.cookies.set('peiauth', 'xxx', { maxAge: (0) });

    this.updateAuthenticationStatus = this.updateAuthenticationStatus.bind(this);

    this.state =
    {
      isAuthenticated: props.cookies.get('peiauth') !== undefined
    }
  }

  updateAuthenticationStatus(boolean)
  {
    if(boolean === false) this.props.cookies.set('peiauth', 'xxx', { maxAge: (0) });

    this.setState(state => ({ isAuthenticated: boolean }));
  }

  render()
  {
    return(
      <Router >
        <Switch>
          <Route exact path="/">
            <Redirect to={{ pathname: "/logon" }} />
          </Route>
          <NotAuthenticatedRoute exact path="/logon" component={Logon} isAuthenticated={this.state.isAuthenticated} login={this.updateAuthenticationStatus} />
          <ProtectedRoute exact path="/home" component={Home} isAuthenticated={this.state.isAuthenticated} login={this.updateAuthenticationStatus} />
          <Route component={Lost} />
        </Switch>
      </Router>
    );
  }
}

/****************************************************************************************************/

export default withCookies(App);
