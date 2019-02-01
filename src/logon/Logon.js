import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import './Logon.css';

import Form from './Form.js';

const strings = require('../strings.json');

/****************************************************************************************************/

class Logon extends Component
{
  componentDidMount()
  {
    document.title = `${strings.appName} - ${strings.headerTitles.logonPage}`;
  }

  render()
  {
    return(
      <div className="mainBlock">
        <div className="subBlock">
          <Form login={this.props.login}></Form>
        </div>
      </div>
    );
  }
}

/****************************************************************************************************/

export default withCookies(Logon);
