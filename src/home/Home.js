import React, { Component } from 'react';
import './Home.css';

import Navigation from '../navigation/Navigation';

const strings = require('../strings.json');

/****************************************************************************************************/

class Home extends Component
{
  componentDidMount()
  {
    document.title = `${strings.appName} - ${strings.headerTitles.homePage}`;
  }

  render()
  {
    return(
      <div>
        <Navigation login={this.props.login} />
        <h1>Home</h1>
      </div>
    );
  }
}

/****************************************************************************************************/

export default Home;
