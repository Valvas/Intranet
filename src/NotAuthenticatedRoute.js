import React, { Component } from 'react';

import
{
  Route,
  Redirect
} from 'react-router-dom';

/****************************************************************************************************/

class NotAuthenticatedRoute extends Component
{
  render()
  {
    const { component: Component, ...rest } = this.props;

    return(
      <Route {...rest} render={props => (this.props.isAuthenticated)
        ? <Redirect to={{ pathname: '/home' }} />
        : <Component {...props} {...rest} />
      } />
    );
  }
}

/****************************************************************************************************/

export default NotAuthenticatedRoute;
