const inquirer = require('inquirer')
const chalk = require('chalk')

function isRemoveSameFile (name) {
  return inquirer.prompt([
    {
      type: 'confirm',
      name: 'isRemoveSameFile',
      message: `${name} folder already exists, Do you want to delete it?`
    }
  ])
}

async function main () {
  const { method } = await inquirer.prompt([
    {
      type: 'list',
      name: 'method',
      message: 'Please pick a preset?',
      choices: [
        {
          name: `Default （${chalk.yellow('[Vue 3 + ts] mock，husky...')}）`,
          value: 'automatic'
        },
        {
          name: 'Manual select features',
          value: 'manual'
        }
      ]
    }
  ])

  if (method === 'automatic') {
    return {
      method
    }
  }

  if (method === 'manual') {
    const tools = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'tools',
        message: 'Please select the tools you will install?',
        choices: ['mock', 'husky', 'css-reset', 'axios']
      }
    ])

    return {
      method,
      ...tools
    }
  }
}

module.exports = {
  isRemoveSameFile,
  main
}
