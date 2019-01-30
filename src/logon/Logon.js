import React, { Component } from 'react';
import './Logon.css';

import Form from './Form.js';

const strings = require('../strings.json');

/****************************************************************************************************/

class Logon extends Component
{
  componentDidMount()
  {
    document.title = `${strings.appName} - ${strings.logonPage.title}`;
  }

  render()
  {
    return(
      <div className="mainBlock">
        <div className="subBlock">
          <Form></Form>
        </div>
      </div>
    );
  }
}

/****************************************************************************************************/

export default Logon;
