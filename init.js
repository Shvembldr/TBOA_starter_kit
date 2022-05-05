const { exec } = require('child_process')
const inquirer = require('inquirer')
const fs = require('fs')

const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'Title of your project',
  },
]

inquirer.prompt(questions).then(async (answers) => {
  try {
    await run('rm -rf .git')
    await run('git init')
    console.log(`initialized git`)
    await run('git add .')
    await run('git commit -m "initial commit"')
    console.log(`created first commit`)
    await run(
      `gh repo create ${answers.title} --private --source=. --remote=upstream`
    )
    console.log(`created repo ${answers.title}`)
    await run(
      `git remote add origin git@github.com:Shvembldr/${answers.title}.git`
    )
    console.log(`added git origin`)
    await run('git push -u origin main ')
    await fs.unlink('init.js', function (err) {
      if (err) throw err
      console.log('File deleted!')
    })
    console.log(`COMPLETE!`)
  } catch (e) {
    console.log(e)
  }
})

function run(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout) => {
      if (error) {
        console.log(`error: ${error.message}`)
        return reject(error)
      }
      resolve(stdout)
    })
  })
}
