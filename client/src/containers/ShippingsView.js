import React, {Component} from 'react';
import {Jumbotron, ListGroup, ListGroupItem, Label} from 'react-bootstrap';
import API from '../api';
import '../index.css';

const Shipping = ({firstName, lastName, address, zipCode, city, email, phoneNumber, specialNotes}) => {
  return (
    <Jumbotron>
      <div>
        <h2 className="inline-block">{firstName} {lastName}</h2>
        <div>
          <h3 className="inline-block info">Email: <Label>{email}</Label></h3>
          <h3 className="inline-block">Phone number: <Label>{phoneNumber}</Label></h3>
        </div>
      </div>

      <ListGroup>
        <ListGroupItem header="Address, city, zip code">{address}, {city}, {zipCode}</ListGroupItem>
        <ListGroupItem header="Special notes" bsStyle="warning">{specialNotes}</ListGroupItem>
      </ListGroup>

    </Jumbotron>
  );
}

export default class ShippingsView extends Component {

  state = {
    shippings: []
  }

  componentDidMount() {
    API.getShippings().then(shippings => {
      this.setState({shippings});
    })
  }

  render() {
    const {shippings} = this.state;

    return (
      <div className="container">

        { shippings.length
            ? this._renderShippings(shippings)
            : <Jumbotron className="text-center"><h2>Sorry, there are no registered shipping information</h2></Jumbotron>
        }

      </div>
    )
  }

  // iterate through list of all shippings to show them on page
  _renderShippings = shippings =>
    shippings.map(props => <Shipping key={props._id} {...props}/>)

}
