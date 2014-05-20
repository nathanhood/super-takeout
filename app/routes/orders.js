'use strict';

var traceur = require('traceur');
var Dish = traceur.require(__dirname + '/../models/dish.js');
var User = traceur.require(__dirname + '/../models/user.js');

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
