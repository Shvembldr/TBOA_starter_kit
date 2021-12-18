const n = (n) => {
    const e = Uint32Array.from(
        [0, 0, 0, 0].map((e, i) => parseInt(n.substr(8 * i + 2, 8), 16))
      ),
      i = () => {
        let n,
          i = e[3]
        return (
          (e[3] = e[2]),
          (e[2] = e[1]),
          (e[1] = n = e[0]),
          (i ^= i << 11),
          (i ^= i >>> 8),
          (e[0] = i ^ n ^ (n >>> 19)),
          e[0] / 4294967296
        )
      },
      t = (n = 0.5) => i() < n,
      o = void 0,
      r = (n, e) => {
        const t = e - n
        return i() * t + n
      },
      d = (n, e) => Math.floor(r(n, e)),
      w = (n) => (n.length ? n[d(0, n.length)] : void 0),
      h = (n) => {
        let e = n.reduce((n, e) => n + e),
          t = i() * e
        for (let e = 0; e < n.length; e++) {
          if (t < n[e]) return e
          t -= n[e]
        }
        return 0
      }
    return {
      value: i,
      chance: t,
      bool: t,
      range: r,
      rangeFloor: d,
      pick: w,
      weighted: h,
    }
  },
  e = void 0
var i = (e, i) => {
  const {
      value: t,
      chance: o,
      bool: r,
      range: d,
      rangeFloor: w,
      pick: h,
      weighted: a,
    } = n(e.hash),
    c = {}
  return (c.color = `rgb(100, 100, ${w(0, 255)})`), (c.sw = d(0, 50) * i), c
}
const { hash: t } = tokenData
let o = 1e3,
  r = window.innerWidth,
  d = window.innerHeight,
  w = Math.min(r, d),
  h = w / 1e3,
  a,
  c,
  s,
  l
function setup() {
  ;(l = createCanvas(a, c)),
    (s = () => {
      const { color: n, sw: e } = i(tokenData, h)
      background(255),
        push(),
        strokeWeight(e),
        fill(n),
        circle(width / 2, height / 2, 0.5 * w),
        pop()
    }),
    s()
}
function draw() {}
0.75 * window.innerHeight >= window.innerWidth
  ? ((a = window.innerWidth), (c = window.innerWidth / 0.75))
  : ((c = window.innerHeight), (a = 0.75 * window.innerHeight))
const g = () => {
  console.log('click')
}
window.addEventListener('click', g), window.addEventListener('touchstart', g)
const u = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let p = !0
function windowResized() {
  const n = void 0,
    e = l.canvas.style
  let i, t
  0.75 * window.innerHeight >= window.innerWidth
    ? ((i = window.innerWidth), (t = window.innerWidth / 0.75))
    : ((t = window.innerHeight), (i = 0.75 * window.innerHeight)),
    (e.position = 'absolute'),
    (e.display = 'block'),
    (e.top = e.left = e.right = e.structure = '0'),
    (e.width = `${i}px`),
    (e.height = `${t}px`)
}
window.addEventListener('keydown', (n) => {
  u.includes(Number(n.key)) && pixelDensity(Number(n.key)),
    's' === n.key && saveCanvas(t, 'png'),
    ' ' === n.key && (p ? (noLoop(), (p = !1)) : (loop(), (p = !0)))
})
