import { PRNG } from '../PRNG'

if (process.env.NODE_ENV === 'development') {
  const genTokenData = (projectNum) => {
    let data = {}
    let hash = '0x'
    for (let i = 0; i < 64; i++) {
      hash += Math.floor(Math.random() * 16).toString(16)
    }
    data.hash = hash
    data.tokenId = Math.floor(
      projectNum * 1000000 + Math.floor(Math.random() * 1000)
    ).toString()
    return data
  }

  const generateSeed = () => {
    // eslint-disable-next-line no-undef
    tokenData = genTokenData(Math.random() * 9999)
  }

  generateSeed()

  window.addEventListener('click', (e) => {
    generateSeed()
    reset()
  })
}

// eslint-disable-next-line no-undef
const { hash } = tokenData

let DEFAULT_SIZE = 1000
let WIDTH = window.innerWidth
let HEIGHT = window.innerHeight
let DIM = Math.min(WIDTH, HEIGHT)
let M = DIM / DEFAULT_SIZE

let ww, wh

if (window.innerHeight * 0.75 >= window.innerWidth) {
  ww = window.innerWidth
  wh = window.innerWidth / 0.75
} else {
  wh = window.innerHeight
  ww = window.innerHeight * 0.75
}

const { value, chance, bool, range, rangeFloor, pick, weighted } = PRNG(hash)

let reset

const variables = {}

const features = {}

let c
function setup() {
  c = createCanvas(ww, wh)

  reset = () => {
    variables.sw = range(0, 50) * M
    features.color = `rgb(100, 100, ${rangeFloor(0, 255)})`

    background(255)

    push()
    strokeWeight(variables.sw)
    fill(features.color)
    circle(width / 2, height / 2, DIM * 0.5)
    pop()
  }

  reset()
}

function draw() {}

const controls = () => {
  console.log('click')
}

window.addEventListener('click', controls)
window.addEventListener('touchstart', controls)

const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let play = true

window.addEventListener('keydown', (e) => {
  if (keys.includes(Number(e.key))) {
    pixelDensity(Number(e.key))
  }

  if (e.key === 's') {
    saveCanvas(hash, 'png')
  }

  if (e.key === ' ') {
    if (play) {
      noLoop()
      play = false
    } else {
      loop()
      play = true
    }
  }
})

function windowResized() {
  const canvas = c.canvas
  const CS = canvas.style

  let ww, wh

  if (window.innerHeight * 0.75 >= window.innerWidth) {
    ww = window.innerWidth
    wh = window.innerWidth / 0.75
  } else {
    wh = window.innerHeight
    ww = window.innerHeight * 0.75
  }

  CS.position = 'absolute'
  CS.display = 'block'
  CS.top = CS.left = CS.right = CS.structure = '0'
  CS.width = `${ww}px`
  CS.height = `${wh}px`
}

if (process.env.NODE_ENV === 'development') {
  window.setup = setup
  window.draw = draw
  window.windowResized = windowResized
}
