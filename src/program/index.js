const program = require('commander')
const inquirer = require('../inquirer')
const download = require('../download')
const chalk = require('chalk')
const ora = require('ora')
const figlet = require('figlet')
const exists = require('fs').existsSync
const fsExtra = require('fs-extra')

const { version } = require('../../package.json')
const log = console.log

function main() {
  const loading = ora('loading...')

  program
    .version(version)
    .command('create <name>')
    .description('create a new project')
    .action(async (name) => {
      // 显示版本
      log(chalk.blue(`Span Cli v${version}`))

      // 是否存在相同文件夹
      if (exists(name)) {
        const { isRemoveSameFile } = await inquirer.isRemoveSameFile()

        if (!isRemoveSameFile) {
          return
        }
        // process.cwd() 对应控制台所在目录
        const cwdUrl = process.cwd()

        fsExtra.removeSync(cwdUrl + '/' + name)
      }

      // 用户选择配置文件
      const { tools } = await inquirer.main()

      loading.start()

      try {
        // 下载git模板
        await download(name)

        // 配置工具
        if (tools) {
        }

        loading.succeed('下载成功')

        console.log(chalk.white('\n如何启动：'))
        console.log(chalk.green(`cd ${name}`))
        console.log(chalk.green(`npm run dev`))

        // Logo
        figlet('Span', (err, data) => {
          if (err) {
            console.log('Something went wrong...')
            console.dir(err)
            return
          }
          console.log(chalk.green(data))
        })
      } catch (err) {
        loading.fail(err)
      }
    })

  program.parse(process.argv)
}

module.exports = main
