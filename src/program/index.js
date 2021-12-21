const chalk = require('chalk')
const program = require('commander')
const { version, showVersion, showLogo, showStartUp, log } = require('../utils')
const { createMain } = require('./create')

function main () {
  commandCreate()
  commandAdd()
  program.parse(process.argv)
}

function commandCreate () {
  program
    .version(version)
    .command('create <name>')
    .description('create a new project')
    .action(async (name) => {
      showVersion()
      const create = new createMain(name)
      const status = await create.init()
      if (status) {
        showStartUp(name)
        showLogo()
      }
    })
}

function commandAdd () {
  program
    .command('add <plugin> [pluginOptions]')
    .description('install a plugin and invoke its generator in an already created project')
    .option('--registry <url>', 'Use specified npm registry when installing dependencies (only for npm)')
    .allowUnknownOption()
    .action((plugin) => {
      try {
        log()
        log(`📦  Installing ${chalk.cyan(plugin)}...`)
        log()
        require('./add/' + plugin)
      } catch (err) {
        log(err || (chalk.bgRed.white(' ERROR '), chalk.red("There is no such plug-in, Please don't be naughty 😝")))
      }
    })
}

module.exports = main
