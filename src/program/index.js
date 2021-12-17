const program = require('commander')
const { version, showVersion, showLogo, showStartUp } = require('../utils')
const { createMain } = require('./create')

function main() {
  program
    .version(version)
    .command('create <name>')
    .description('create a new project')
    .action(async (name) => {
      const create = new createMain(name)

      showVersion()

      const status = await create.init()

      if (status) {
        showStartUp(name)
        showLogo()
      }
    })

  program.parse(process.argv)
}

module.exports = main
