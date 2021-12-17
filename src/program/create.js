const exists = require('fs').existsSync
const download = require('../download')
const inquirer = require('../inquirer')
const chalk = require('chalk')
const fsExtra = require('fs-extra')
const loading = require('ora')('🚕  Downloading data, please wait...')

class Main {
  constructor(name) {
    this.name = name
    this.options = null
    this.status = true
  }

  async init() {
    let isContinue = await this.isExistsSameFolder()

    if (!isContinue) {
      return
    }
    await this.setOptions()
    await this.downloadDemo()

    // TODO 工具正在建设中...
    if (this.options && this.options.tools && this.status) {
      console.log(chalk.yellowBright(this.options.tools + ' Under construction...'))
    }

    return this.status
  }

  async isExistsSameFolder() {
    if (exists(this.name)) {
      const { isRemoveSameFile } = await inquirer.isRemoveSameFile(this.name)

      if (isRemoveSameFile) {
        fsExtra.removeSync(process.cwd() + '/' + this.name)
        return true
      }
      return false
    }
    return true
  }

  async setOptions() {
    this.options = await inquirer.main()
  }

  async downloadDemo() {
    loading.start()
    try {
      await download(this.name)
      loading.succeed(chalk.green('Download succeeded'))
    } catch (err) {
      this.status = false
      console.error('\n' + chalk.red(err))
      loading.fail(chalk.red('Download failed'))
    }
  }
}

module.exports = {
  createMain: Main
}
