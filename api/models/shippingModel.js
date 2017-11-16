'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShippingSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true,
    maxLength: 10
  },
  specialNotes: {
    type: String,
    required: true,
    maxLength: 500
  }
});


module.exports = mongoose.model('Shippings', ShippingSchema);
