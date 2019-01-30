import React, { Component } from 'react';

import
{
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom";

import Lost from './lost/Lost';
import Logon from './logon/Logon';
import Navigation from './navigation/Navigation';

/****************************************************************************************************/

class App extends Component
{
  constructor(props)
  {
    super(props);

    this.state =
    {
      isAuthenticated: false
    }
  }

  render()
  {
    const content =
    <Router>
      <Switch>
        <Route path="/logon" component={Logon} />
        <Route path="/home" component={Navigation} />
        <Route path="/"><Redirect to={{ pathname: "/logon" }} /></Route>
        <Route component={Lost} />
      </Switch>
    </Router>

    return content;
  }
}

/****************************************************************************************************/

export default App;
