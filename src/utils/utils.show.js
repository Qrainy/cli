const chalk = require('chalk')
const figlet = require('figlet')
const { version } = require('../../package.json')
const log = console.log

function showVersion () {
  log(chalk.blue(`Span Cli v${version}`))
}

function showLogo () {
  figlet('Span cli', (err, data) => {
    if (err) {
      log('Something went wrong...')
      return
    }
    log(chalk.green(data))
  })
}

function showStartUp (name) {
  log()
  log(chalk.white(`🎉  Successfully created project ${chalk.yellow(name)}.`))
  log(chalk.white('👉  Get started with the following commands: '))
  log(chalk.green(`$ cd ${name}`))
  log(chalk.green(`$ npm run dev`))
}


module.exports = {
  showVersion,
  showLogo,
  showStartUp,
  log,
  version
}
