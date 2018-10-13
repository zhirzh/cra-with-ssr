var path = require('path');

var BUILD_DIR = path.join(__dirname, '..', 'client', 'build');
var PUBLIC_DIR = path.join(__dirname, 'public');

module.exports = {
  BUILD_DIR,
  PUBLIC_DIR,
};
