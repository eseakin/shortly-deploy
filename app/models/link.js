var db = require('../config');
var crypto = require('crypto');

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function() {
//     this.on('creating', function(model, attrs, options) {
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

var Link = function(attributes) {

  var newLink = new UrlData(attributes);
  var promise = newLink.save();
  return promise.then(function(doc) {
    var shasum = crypto.createHash('sha1');
    shasum.update(doc.url);
    doc.code = shasum.digest('hex').slice(0, 5);
    return doc;
  });
};

// new Link({ url: uri })

module.exports = Link;