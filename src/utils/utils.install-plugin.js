const exists = require('fs').existsSync
const execa = require('execa')
const chalk = require('chalk')
const { hasNpm, hasPnpm, hasYarn } = require('./utils.env')
const log = console.log

/**
 * 执行命令
 * @param {String} command 
 * @param {Array} args 
 * @param {Object} options 
 * @returns 
 */
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
      .catch((err) => {
        log()
        log(chalk.bgRed.white(' ERROR COMMAND '), chalk.red(err.command))
        log()
        log(chalk.bgRedBright.white(' Are you crazy ?', 'Please Baidu or Google by yourself. '))
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
  await executeCommand(bin, [bin === 'yarn' ? 'add' : 'install', ...plugins.split(" "), depend], {
    cwd
  })
}

module.exports = {
  executeCommand,
  installPlugins
}