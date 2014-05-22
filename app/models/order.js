'use strict';

var traceur = require('traceur');
var async = require('async');
var Dish = traceur.require(__dirname + '/../models/dish.js');
var orders = global.nss.db.collection('orders');
var Mongo = require('mongodb');
// var _ = require('lodash');
// var bcrypt = require('bcrypt');

class Order{
  constructor(userId, meals){
    this.userId = userId;
    this.meals = meals;
    this.date = new Date();
  }

  totalCostAndCal(fn){
    var dishIds = this.meals.map(d=>d.dishId);
    var order = this;
    var tasks = [];

    tasks.push((fn)=>{
      Dish.findDishesByArray(dishIds, dishes=>{
        var total = 0;
        dishes.forEach((dish, i)=>{
          total += dish.cost * order.meals[i].qty;
        });
        fn(null, total);
      });
    });
    tasks.push((fn)=>{
      Dish.findDishesByArray(dishIds, dishes=>{
        var total = 0;
        dishes.forEach((dish, i)=>{
          total += dish.calories * this.meals[i].qty;
        });
        fn(null, total);
      });
    });

    async.series(tasks, (e, results)=>{
      console.log(results);
      order.cost = results[0];
      order.calories = results[1];
      order.save(()=>fn());
    });
  }

  save(fn){
    orders.save(this, ()=>fn());
  }

  static findByOrderId(orderId, fn){
    orderId = Mongo.ObjectID(orderId);
    orders.findOne({_id:orderId}, (err, order)=>{
      fn(order);
    });
  }

}

module.exports = Order;
