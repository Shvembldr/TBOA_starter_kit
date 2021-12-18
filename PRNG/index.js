export const PRNG = (hash) => {
  /* Algorithm "xor128" from p. 5 of Marsaglia, "Xorshift RNGs" */
  /* Adapted by Piter Pasma */

  const xs_state = Uint32Array.from(
    [0, 0, 0, 0].map((_, i) => parseInt(hash.substr(i * 8 + 2, 8), 16))
  )

  const value = () => {
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

  const chance = (n = 0.5) => value() < n
  const bool = chance // lol

  const range = (min, max) => {
    const delta = max - min
    return value() * delta + min
  }

  const rangeFloor = (min, max) => Math.floor(range(min, max))

  const pick = (array) =>
    array.length ? array[rangeFloor(0, array.length)] : undefined

  const weighted = (weights) => {
    let totalWeight = weights.reduce((a, b) => a + b)

    let random = value() * totalWeight
    for (let i = 0; i < weights.length; i++) {
      if (random < weights[i]) {
        return i
      }
      random -= weights[i]
    }
    return 0
  }

  return {
    value,
    chance,
    bool,
    range,
    rangeFloor,
    pick,
    weighted,
  }
}
