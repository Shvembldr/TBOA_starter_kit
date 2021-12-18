const P5_FUNCTIONS = require('./p5_functions')

module.exports = {
  compress: {
    dead_code: true,
    drop_console: false,
    drop_debugger: true,
    keep_classnames: false,
    keep_fargs: false,
    keep_fnames: false,
    keep_infinity: false,
    passes: 5,
    unused: false,
  },
  mangle: {
    eval: true,
    properties: false,
    keep_classnames: false,
    toplevel: true,
    reserved: P5_FUNCTIONS
  },
  module: false,
  sourceMap: false,
}
