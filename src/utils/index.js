const chalk = require('chalk')
const figlet = require('figlet')
const { version } = require('../../package.json')

function showVersion() {
  console.log(chalk.blue(`Span Cli v${version}`))
}

function showLogo() {
  figlet('Welcome Span-cli', (err, data) => {
    if (err) {
      console.log('Something went wrong...')
      return
    }
    console.log(chalk.green(data))
  })
}

function showStartUp(name) {
  console.log(chalk.white('\nIf started：'))
  console.log(chalk.green(`cd ${name}`))
  console.log(chalk.green(`npm install or yarn install`))
  console.log(chalk.green(`npm run dev`))
}

module.exports = {
  showVersion,
  showLogo,
  showStartUp,
  version
}
