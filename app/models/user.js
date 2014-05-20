'use strict';

var users = global.nss.db.collection('users');
var Mongo = require('mongodb');
// var _ = require('lodash');
var bcrypt = require('bcrypt');

class User{
  constructor(obj){
    this.email = obj.email;
    this.password = obj.password;
  }

  login(fn){
    users.findOne({email:this.email}, (err, u)=>{
      if(u){//if no user exists,
        var isMatch = bcrypt.compareSync(this.password, u.password);
        if(isMatch){
          fn(u);
        }else{
          fn(null);
        }
      }else{
        this.password = bcrypt.hashSync(this.password, 8); //hashed/encrypted version of password
        users.save(this, (err, u)=>{
          fn(u);
        });
      }
    });
  }

  static findByUserId(userId, fn){
    userId = Mongo.ObjectID(userId);
    users.findOne({_id:userId}, (err, user)=>{
      fn(user);
    });
  }
}

module.exports = User; //exporting Class out
