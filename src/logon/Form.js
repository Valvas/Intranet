import React, { Component } from 'react';
import './Form.css';

const strings = require('../strings.json');

/****************************************************************************************************/

class Form extends Component
{
  constructor(props)
  {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render()
  {
    return(
      <form className="formBlock" onSubmit={this.handleSubmit}>
        <div className="formTitle">{strings.logonPage.title}</div>
        <div className="formContent">
          <div className="formContainer">
            <div className="formLabel">{strings.logonPage.form.emailLabel}</div>
            <input className="formInput" type="text" name="email" required />
          </div>
          <div className="formContainer">
            <div className="formLabel">{strings.logonPage.form.passwordLabel}</div>
            <input className="formInput" type="password" name="password" required />
          </div>
          <div className="formSubmit">
            <button className="formSubmitButton" type="submit">{strings.logonPage.form.submitLabel}</button>
          </div>
        </div>
      </form>
    );
  }

  handleSubmit(event)
  {
    event.preventDefault();

    fetch('/account/login', { method: 'POST', body: JSON.stringify({ user: event.target.elements['email'].value, pass: event.target.elements['password'].value }), headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }})
    .then(result => result.json())
    .then(
    (result) =>
    {
      console.log(result);
    },
    (error) =>
    {
      console.log(error);
    });
  }
}

/****************************************************************************************************/

export default Form;
