const chalk = require('chalk')
const fsExt = require('fs-extra')
const path = require('path')
const exists = require('fs').existsSync
const { executeCommand, log } = require('../../utils')

async function main () {
  // TODO 子进程，安装路径
  await executeCommand('npm', ['install', 'mock', '-D'])
  await startWriteFileToMock()
  showStartUp()
}

async function startWriteFileToMock () {
  const src = path.resolve(__dirname, '../../template/mock')
  // TODO 自动化安装，路经不正确
  const dest = exists('src') ? 'src/mock' : 'mock'

  if (exists(dest)) {
    throw new Error(chalk.red(`${dest} folder already exists，Please delete it`))
  }

  return fsExt.copy(src, dest)
}

function showStartUp () {
  log()
  log()
  log()
  log(chalk.white(`🎉  Successfully created mock.`))
  log(chalk.white('👉  Get started with the following: '))
  log(chalk.green(`Import mock file at main entry，For example：${chalk.magenta("import './mock' ")}`))
  log()
  log()
  log()
}

main()
