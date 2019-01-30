import React, { Component } from 'react';
import './Navigation.css';

const strings = require('../strings.json');

/****************************************************************************************************/

class Navigation extends Component
{
  componentDidMount()
  {
    document.title = `${strings.appName} - ${strings.homePage.title}`;
  }

  render()
  {
    return(
      <h1>HOME</h1>
    );
  }
}

/****************************************************************************************************/

export default Navigation;
