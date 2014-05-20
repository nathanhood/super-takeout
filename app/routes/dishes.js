'use strict';

var traceur = require('traceur');
var Dish = traceur.require(__dirname + '/../models/dish.js');

exports.menu = (req, res)=>{
  Dish.findDishesByMenu(req.params.menu, dishes=>{
    res.render('orders/dishmenu', {dishes:dishes});
  });
};
