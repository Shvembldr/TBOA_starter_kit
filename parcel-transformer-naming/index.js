const P5_FUNCTIONS = require('../p5_functions')
const { Transformer } = require('@parcel/plugin')

module.exports = new Transformer({
  async transform({ asset }) {
    if (process.env.NODE_ENV !== 'production') {
      return [asset]
    }

    const source = await asset.getCode()
    const pattern = RegExp(`.{17}\\$var\\$(${P5_FUNCTIONS.join('|')})`, 'gm')

    asset.setCode(source.replace(pattern, '$1'))

    return [asset]
  },
})
