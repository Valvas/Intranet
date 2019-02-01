import React, { Component } from 'react';
import './Lost.css';

const strings = require('../strings.json');

/****************************************************************************************************/

class Lost extends Component
{
  componentDidMount()
  {
    document.title = `${strings.appName} - ${strings.headerTitles.lostPage}`;
  }

  render()
  {
    return(
      <h1>LOST</h1>
    );
  }
}

/****************************************************************************************************/

export default Lost;
