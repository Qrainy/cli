const exists = require('fs').existsSync
const download = require('../download')
const inquirer = require('../inquirer')
const chalk = require('chalk')
const fsExtra = require('fs-extra')
const loading = require('ora')('🚕  Downloading data, please wait...')
const { installPlugins, log } = require('../utils')

class Main {
  constructor(name) {
    this.name = name
    this.cwd = process.cwd() + '/' + name
    this.options = null
    this.status = true
  }

  async init () {
    let isContinue = await this.isExistsSameFolder()

    if (!isContinue) {
      return
    }
    await this.setOptions()
    await this.downloadDemo()
    await installPlugins('', this.cwd)
    await this.injectPlugin()

    return this.status
  }

  async isExistsSameFolder () {
    if (exists(this.name)) {
      const { isRemoveSameFile } = await inquirer.isRemoveSameFile(this.name)

      if (isRemoveSameFile) {
        fsExtra.removeSync(this.cwd)
        return true
      }
      return false
    }
    return true
  }

  async setOptions () {
    this.options = await inquirer.main()
  }

  async downloadDemo () {
    loading.start()
    try {
      await download(this.name)
      loading.succeed(chalk.green('Download succeeded'))
      log()
    } catch (err) {
      this.status = false
      console.error('\n' + chalk.red(err))
      loading.fail(chalk.red('Download failed'))
    }
  }

  // TODO 工具正在建设中... 'husky', 'css-reset', 'axios-strong'
  // mock ✅
  // husky ✅
  // css-reset ❌
  // axios-strong ❌
  async injectPlugin () {
    const defaultTools = ['mock', 'husky']
    let tools = this.options.method === 'automatic' ? defaultTools : this.options.tools

    for (let key in tools) {
      const classFn = require(`./add/${tools[key]}`)
      await new classFn(this.cwd).init()
    }
  }
}

module.exports = {
  createMain: Main
}
