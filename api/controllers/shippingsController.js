'use strict';

const mongoose = require('mongoose'),
  Shipping = mongoose.model('Shippings');

exports.list_all_shippings = function(req, res) {
  Shipping.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.create_a_shipping = function(req, res) {
  const new_task = new Shipping(req.body);

  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
