const chalk = require('chalk')
const fsExt = require('fs-extra')
const path = require('path')
const exists = require('fs').existsSync
const { log, installPlugins, executeCommand, getRootPath, is } = require('../../utils')

class Husky {
  constructor(childProcessPath) {
    this.childProcessPath = childProcessPath || process.cwd()
  }

  async init () {
    await this.initGit()
    await this.setPackageFile()
    await this.executeScript()
    await this.startWriteFileToHusky()
    this.showStartUp()
  }

  async initGit () {
    const gitPath = this.childProcessPath + '/.git'

    if (!exists(gitPath)) {
      executeCommand('git', ['init'], { cwd: this.childProcessPath })
    }
  }

  async setPackageFile () {
    const configPath = getRootPath() + '/config/husky.package.js'
    const descPath = this.childProcessPath + '/package.json'

    if (!exists(descPath)) {
      throw new Error(chalk.red(' Cannot find package.json file. '))
    }

    const configData = require(configPath)
    const descData = JSON.parse(fsExt.readFileSync(descPath).toString())

    for (let key in configData) {
      if (descData.hasOwnProperty(key)) {
        descData[key] = {
          ...descData[key],
          ...configData[key]
        }
      } else {
        descData[key] = configData[key]
      }
    }
    fsExt.writeFileSync(descPath, JSON.stringify(descData, null, 2))
  }

  async executeScript () {
    await installPlugins('husky lint-staged @commitlint/cli @commitlint/config-conventional', this.childProcessPath)
    await executeCommand('npx', ['husky', 'install'], { cwd: this.childProcessPath })
    await executeCommand('npx', ['husky', 'add', '.husky/pre-commit', 'npm run lint-staged'], { cwd: this.childProcessPath })
    await executeCommand('npx', ['husky', 'add', '.husky/commit-msg', 'npm run lint-commit-msg'], { cwd: this.childProcessPath })
  }

  async startWriteFileToHusky () {
    const src = path.resolve(__dirname, '../../template/husky/commitlint.config.js')
    const dest = this.childProcessPath + '/commitlint.config.js'

    if (exists(dest)) {
      throw new Error(chalk.red(`${dest} folder already exists，Please delete it`))
    }

    return fsExt.copyFile(src, dest)
  }

  showStartUp () {
    log()
    log(chalk.white(`🎉  Successfully created ${chalk.yellow('husky')}.`))
    log()
  }
}

module.exports = Husky
