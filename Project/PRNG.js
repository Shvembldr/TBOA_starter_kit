export const PRNG = (hash) => {
  /* Algorithm "xor128" from p. 5 of Marsaglia, "Xorshift RNGs" */
  /* Adapted by Piter Pasma */

  const xs_state = Uint32Array.from(
    [0, 0, 0, 0].map((_, i) => parseInt(hash.substr(i * 8 + 2, 8), 16))
  )

  const rnd = () => {
    let s,
      t = xs_state[3]
    xs_state[3] = xs_state[2]
    xs_state[2] = xs_state[1]
    xs_state[1] = s = xs_state[0]
    t ^= t << 11
    t ^= t >>> 8
    xs_state[0] = t ^ s ^ (s >>> 19)
    return xs_state[0] / 0x100000000
  }

  // From here, you can trim out the methods you don't want,
  // or add your own using value() as source of randomness

  const chance = (n = 0.5) => rnd() < n
  const bool = chance // lol

  const range = (min, max) => {
    if (!max) {
      return rnd() * min
    }
    return rnd() * (max - min) + min
  }

  const rangeFloor = (min, max) => Math.floor(range(min, max))

  const pick = (array) =>
    array.length ? array[rangeFloor(0, array.length)] : undefined

  const weighted = (weights) => {
    let totalWeight = weights.reduce((a, b) => a + b)

    let random = rnd() * totalWeight
    for (let i = 0; i < weights.length; i++) {
      if (random < weights[i]) {
        return i
      }
      random -= weights[i]
    }
    return 0
  }

  const pickSome = (arr, num) => {
    let shuffled = shuffleArray(arr)
    return shuffled.slice(0, num)
  }

  const shuffleArray = (arr) => {
    let rand
    let tmp
    let len = arr.length
    let ret = arr.slice()
    while (len) {
      rand = Math.floor(rnd() * len--)
      tmp = ret[len]
      ret[len] = ret[rand]
      ret[rand] = tmp
    }
    return ret
  }

  const defined = function () {
    for (var i = 0; i < arguments.length; i++) {
      if (arguments[i] !== undefined) return arguments[i]
    }
  }

  const onCircle = (radius, out) => {
    radius = defined(radius, 1)
    out = out || []
    var theta = rnd() * 2.0 * Math.PI
    out[0] = radius * Math.cos(theta)
    out[1] = radius * Math.sin(theta)
    return out
  }

  const insideCircle = (radius, out) => {
    radius = defined(radius, 1)
    out = out || []
    onCircle(1, out)
    var r = radius * Math.sqrt(rnd())
    out[0] *= r
    out[1] *= r
    return out
  }

  let _hasNextGaussian = false
  let _nextGaussian = null

  const gaussian = (mean, standardDerivation) => {
    if (_hasNextGaussian) {
      _hasNextGaussian = false
      let result = _nextGaussian
      _nextGaussian = null
      return mean + standardDerivation * result
    } else {
      let v1 = 0
      let v2 = 0
      let s = 0
      do {
        v1 = rnd() * 2 - 1 // between -1 and 1
        v2 = rnd() * 2 - 1 // between -1 and 1
        s = v1 * v1 + v2 * v2
      } while (s >= 1 || s === 0)
      let multiplier = Math.sqrt((-2 * Math.log(s)) / s)
      _nextGaussian = v2 * multiplier
      _hasNextGaussian = true
      return mean + standardDerivation * (v1 * multiplier)
    }
  }

  return {
    rnd,
    chance,
    bool,
    range,
    rangeFloor,
    pick,
    pickSome,
    weighted,
    shuffleArray,
    onCircle,
    insideCircle,
    gaussian,
  }
}
