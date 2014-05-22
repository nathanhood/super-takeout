/* jshint unused:false */

'use strict';

var traceur = require('traceur');
var Dish = traceur.require(__dirname + '/../models/dish.js');
var User = traceur.require(__dirname + '/../models/user.js');
var Order = traceur.require(__dirname + '/../models/order.js');

exports.new = (req, res)=>{
  Dish.menu(menus=>{
    User.findByUserId(req.session.userId, user=>{
      res.render('orders/new', {user:user, menus:menus, title:'Order Food'});
    });
  });
};

exports.addMenu = (req, res)=>{
  Dish.menu(menus=>{
    res.render('orders/addmenu', {menus:menus});
  });
};

exports.create = (req, res)=>{
  var meals = [];
  for(var i = 0; i < req.body.qty.length; i++){
    var obj = {};
    obj.dishId = req.body.dishId[i];
    obj.qty = req.body.qty[i];
    meals.push(obj);
  }
  console.log(meals);
  var order = new Order(req.session.userId, meals);
  order.totalCostAndCal(()=>{
    res.redirect(`/orders/confirm?orderId=${order._id}`);
  });
};

exports.confirmOrder = (req, res)=>{
  User.findByUserId(req.session.userId, user=>{
    Order.findByOrderId(req.query.orderId, order=>{
      res.render('orders/confirm', {user:user, order:order, title:'Order Confirmation'});
    });
  });
};
