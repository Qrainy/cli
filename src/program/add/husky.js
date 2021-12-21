const chalk = require('chalk')
const { executeCommand } = require('../../utils')

async function main () {
  const statusCommand = await executeCommand('npm', ['install', 'husky', '-D'])

  if (!statusCommand) {
    return
  }
}

main()
