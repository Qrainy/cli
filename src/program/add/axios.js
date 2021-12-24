const chalk = require('chalk')
const fsExt = require('fs-extra')
const path = require('path')
const exists = require('fs').existsSync
const { log, installPlugins } = require('../../utils')


class Axios {
  constructor(childProcessPath) {
    this.childProcessPath = childProcessPath || process.cwd()
  }

  async init () {
    await installPlugins('axios', this.childProcessPath, '-S')
    await this.startWriteFileToAxios()
    this.showStartUp()
  }

  async startWriteFileToAxios () {
    const src = path.resolve(__dirname, '../../template/services')
    const dest = this.childProcessPath + (exists(this.childProcessPath + '/src') ? '/src/services' : '/services')

    if (exists(dest)) {
      throw new Error(chalk.red(`${dest} folder already exists，Please delete it`))
    }

    return fsExt.copy(src, dest)
  }

  showStartUp () {
    log()
    log(chalk.white(`🎉  Successfully created ${chalk.yellow('axios')}.`))
    log(chalk.white('👉  You will find an additional src/services folder'))
    log()
  }

}



module.exports = Axios
