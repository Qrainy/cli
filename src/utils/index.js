const chalk = require('chalk')
const figlet = require('figlet')
const execa = require('execa')
const { version } = require('../../package.json')
const log = console.log

function showVersion () {
  log(chalk.blue(`Span Cli v${version}`))
}

function showLogo () {
  figlet('Welcome To Span-cli', (err, data) => {
    if (err) {
      log('Something went wrong...')
      return
    }
    log(chalk.green(data))
  })
}

function showStartUp (name) {
  log()
  log(chalk.white(`🎉  Successfully created project ${name}.`))
  log(chalk.white('👉  Get started with the following commands: '))
  log(chalk.green(`$ cd ${name}`))
  log(chalk.green(`$ npm run dev`))
}

function executeCommand (command, args, options = {}) {
  options = {
    stdio: 'inherit',
    ...options
  }

  return new Promise((resolve, reject) => {
    execa(command, args, options)
      .then(() => {
        resolve(true)
      })
      .catch(() => {
        reject(false)
      })
  })
}

module.exports = {
  showVersion,
  showLogo,
  showStartUp,
  executeCommand,
  log,
  version
}
