const splitFile = require('split-file')

const fs = require('fs')
const path = require('path')

const buildPath = path.join(__dirname, 'build')
const testPath = path.join(__dirname, 'test')

fs.unlink(`${buildPath}/index.html`, function (err) {
  if (err) console.log('ERROR: ' + err)
})

fs.readdir(buildPath, (err, files) => {
  files.forEach(async (file) => {
    await splitFile
      .splitFileBySize(`${buildPath}/${file}`, 10000)
      .then((names) => {
        console.log(names)

        names.forEach((name, i) => {
          fs.rename(name, `${buildPath}/part${i}`, function (err) {
            if (err) console.log('ERROR: ' + err)
          })
        })
      })
      .catch((err) => {
        console.log('Error: ', err)
      })
    fs.rename(`${buildPath}/${file}`, `${testPath}/script.js`, function (err) {
      if (err) console.log('ERROR: ' + err)
    })
  })
})
