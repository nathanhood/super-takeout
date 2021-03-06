'use strict';

var dishes = global.nss.db.collection('dishes');
var Mongo = require('mongodb');
var _ = require('lodash');


class Dish{

  static findDishesByArray(dishIds, fn){
    var idArray = dishIds.map(id=>Mongo.ObjectID(id));
    dishes.find({ _id: { $in: idArray } }).toArray((err, dishes)=>{
      fn(dishes);
    });
  }

  static findDishesByMenu(menu, fn){
    dishes.find({menu:menu}).toArray((err, dishesArray)=>{
      fn(dishesArray);
    });
  }

  static findAll(fn){
    dishes.find().toArray((err, dishes)=>{
      fn(dishes);
    });
  }

  static menu(fn){
    Dish.findAll(dishes=>{
      var menus = _.uniq(dishes.map(d=>d.menu));
      fn(menus);
    });
  }
}

module.exports = Dish;
