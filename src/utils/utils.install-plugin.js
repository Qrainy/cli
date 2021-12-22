const exists = require('fs').existsSync
const execa = require('execa')
const chalk = require('chalk')
const { hasNpm, hasPnpm, hasYarn } = require('./utils.env')

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

function chooseInstallTool () {
  if (hasPnpm()) {
    return 'pnpm'
  }
  if (hasYarn()) {
    return 'yarn'
  }
  if (hasNpm()) {
    return 'npm'
  }
}

async function installPlugins (plugins = '', cwd = process.cwd(), depend = '-D') {
  const bin = chooseInstallTool()
  if (!exists(cwd + '/package.json')) {
    throw new Error(chalk.red(' Cannot find package.json file. '))
  }
  if (!plugins.length) {
    await executeCommand(bin, ['install'], {
      cwd
    })
    return
  }
  await executeCommand(bin, [bin === 'yarn' ? 'add' : 'install', plugins, depend], {
    cwd
  })
}

module.exports = {
  executeCommand,
  installPlugins
}