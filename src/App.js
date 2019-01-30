import React, { Component } from 'react';

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
    return this.state.isAuthenticated
    ? <Navigation />
    : <Logon />
  }
}

/****************************************************************************************************/

export default App;
