import React, {Component} from 'react';
import { FormGroup, Jumbotron, ControlLabel, FormControl, HelpBlock, Button} from 'react-bootstrap';

import API from '../api';
const numbers = /^[0-9\b]+$/;
const email = /^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default class ShippingsView extends Component {

  state = {
    applied: false,
    disabled: true,
    form: {
      firstName: '',
      lastName: '',
      address: '',
      zipCode: '',
      city: '',
      email: '',
      phoneNumber: '',
      specialNotes: '',
    }
  }

  render() {
    return (
      <div className="container col-sm-offset-3 col-sm-6">
        {!this.state.applied
          ? this._renderForm()
          : this._renderAppliedNotification()
        }
      </div>
    )
  }

  _applyInformation = () => {
    if(this._emailIsValid()) {
      this.setState({disabled: true}, () => {
        API.saveShipping(this.state.form).then(() => {
          this.setState({applied: true})
        });
      })
    } else {
      alert('Email format is not valid, please try again')
    }


  }

  _emailIsValid = () => email.test(this.state.form.email)

  _onChange = ({target}) => {
    if(target.getAttribute('restrictto') === 'number' && !numbers.test(target.value)) {
      if(target.value !== '')
        return
    }

    this.setState({
      form: {
        ...this.state.form,
        [target.id]: target.value
      }
    }, this._handleDisabling)
  }

  _handleDisabling = () => {
    const {disabled} = this.state;
    const invalid = this._validateRequiredFields();

    if(invalid === 0 && disabled) {
      this.setState({disabled: false})
    } else if(invalid !== 0 && !disabled) {
      this.setState({disabled: true})
    }
  }

  // checks for empty fiealds, value 0 form is filled up
  _validateRequiredFields = () => Object.values(this.state.form)
      .reduce((acc, cur) => cur.length ? 0 : Number(acc) + 1)

  _renderAppliedNotification = () => (<Jumbotron className="text-center"><h2>Thank you for applying!</h2></Jumbotron>)

  _renderForm = () => {
    return (
      <form>
        <FieldGroup
          id="firstName"
          type="text"
          label="First name"
          value={this.state.form.firstName}
          onChange={this._onChange}
        />
        <FieldGroup
          id="lastName"
          type="text"
          label="Last name"
            value={this.state.form.lastName}
          onChange={this._onChange}
        />
        <FieldGroup
          id="address"
          type="text"
          label="Address"
            value={this.state.form.address}
          onChange={this._onChange}
        />
        <FieldGroup
          id="zipCode"
          type="text"
          label="Zip code"
          value={this.state.form.zipCode}
          onChange={this._onChange}
        />
        <FieldGroup
          id="city"
          type="text"
          label="City"
          value={this.state.form.city}
          onChange={this._onChange}
        />
        <FieldGroup
          id="email"
          type="email"
          label="Email address"
          value={this.state.form.email}
          onChange={this._onChange}
        />
        <FieldGroup
          id="phoneNumber"
          type="text"
          label="Phone number"
          maxLength={10}
          restrictto="number"
          value={this.state.form.phoneNumber}
          onChange={this._onChange}
        />
        <FormGroup controlId="specialNotes">
          <ControlLabel>Special notes</ControlLabel>
          <FormControl value={this.state.form.specialNotes} onChange={this._onChange} maxLength={500} componentClass="textarea" />
        </FormGroup>
        <Button disabled={this.state.disabled} onClick={this._applyInformation} type="button">
          Submit
        </Button>
      </form>
    )
  }
}
