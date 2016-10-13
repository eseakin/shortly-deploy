var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function() {
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function() {
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });

var Schema = db.Schema;
var Objectid = Schema.ObjectId;

var userSchema = new Schema({
  id: Objectid,
  username: { type: String, unique: true},
  password: String,
  timestamp: { type: Date, default: Date.now }
});

userSchema.pre('save', function(next) {
  this.hashPassword();
  next();
});

userSchema.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    console.log('comparing password...', this.password, isMatch);
    callback(isMatch);
  });
};

userSchema.methods.hashPassword = function() {
  console.log('password', this.get('password'));
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      console.log('password', this.get('password'));
      this.set('password', hash);
      console.log('password', this.get('password'));
    });
};

var User = db.model('User', userSchema);

module.exports = User;
