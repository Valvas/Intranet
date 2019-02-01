import React, { Component } from 'react';

import
{
  Route,
  Redirect
} from 'react-router-dom';

/****************************************************************************************************/

class ProtectedRoute extends Component
{
  render()
  {
    const { component: Component, ...rest } = this.props;

    return(
      <Route {...rest} render={props => (this.props.isAuthenticated)
        ? <Component {...rest} {...props} />
        : <Redirect to={{ pathname: '/logon' }} />
      } />
    );
  }
}

/****************************************************************************************************/

export default ProtectedRoute;
