const colors = require('colors/safe');

module.exports = {
  info(msg) {
    console.log(colors.green('[min]'), msg);
  },
  warn(msg) {
    console.log(colors.cyan('[min]'), msg);
  },
  error(msg) {
    console.log(colors.red('[min]'), msg);
  },
}
