#! /usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const figlet = require('figlet')
const { version } = require('./package.json')
const log = console.log

program
  .version(version)
  .command('create <name>')
  .description('create a new project')
  .action((name) => {
    log(chalk.blue(`Span Cli v${version}`))
    figlet('Span', (err, data) => {
      if (err) {
        console.log('Something went wrong...')
        console.dir(err)
        return
      }
      console.log(chalk.green(data))
    })
  })

program.parse(process.argv)
