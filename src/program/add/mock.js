const chalk = require('chalk')
const fsExt = require('fs-extra')
const path = require('path')
const exists = require('fs').existsSync
const { log, installPlugins } = require('../../utils')


class Mock {
  constructor(childProcessPath) {
    this.childProcessPath = childProcessPath || process.cwd()
  }

  async init () {
    await installPlugins('mockjs', this.childProcessPath)
    await this.startWriteFileToMock()
    this.showStartUp()
  }

  async startWriteFileToMock () {
    const src = path.resolve(__dirname, '../../template/mock')
    const dest = this.childProcessPath + (exists(this.childProcessPath + '/src') ? '/src/mock' : '/mock')

    if (exists(dest)) {
      throw new Error(chalk.red(`${dest} folder already exists，Please delete it`))
    }

    return fsExt.copy(src, dest)
  }

  showStartUp () {
    log()
    log(chalk.white(`🎉  Successfully created ${chalk.yellow('mock')}.`))
    log(chalk.white('👉  Get started with the following: '))
    log(chalk.green(`Import mock file at main entry，For example：${chalk.magenta("import './mock' ")}`))
    log()
  }

}



module.exports = Mock
