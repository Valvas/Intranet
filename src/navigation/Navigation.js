import React, { Component } from 'react';
import './Navigation.css';

import { Link } from "react-router-dom";

const strings = require('../strings.json');

/****************************************************************************************************/

class Navigation extends Component
{
  render()
  {
    return(
      <nav className="navigationBar">
        <div className="navigationBarContainer">
          <div className="navigationBarLeftPart">
            <div className="navigationBarTitle">
              <div className="navigationBarTitleIcon">{strings.navigationBar.company}</div>
              <div className="navigationBarTitleValue">{strings.navigationBar.title}</div>
            </div>
            <div className="navigationBarMenu">
              <Link className="navigationBarMenuElement" to="/home">{strings.navigationBar.menu.home}</Link>
              <Link className="navigationBarMenuElement" to="/account">{strings.navigationBar.menu.account}</Link>
              <div onClick={() => { this.props.login(false) }} className="navigationBarMenuElement">{strings.navigationBar.menu.logout}</div>
            </div>
          </div>
          <div className="navigationBarRightPart">
            <div className="navigationBarAccount">
              <div className="navigationBarAccountEmail">test@groupepei.fr</div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

/****************************************************************************************************/

export default Navigation;
