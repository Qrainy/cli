const inquirer = require('inquirer')

function isRemoveSameFile() {
  return inquirer.prompt([
    {
      type: 'confirm',
      name: 'isRemoveSameFile',
      message: '是否删除相同文件夹？'
    }
  ])
}

async function main() {
  const { method } = await inquirer.prompt([
    {
      type: 'list',
      name: 'method',
      message: '请选择自动还是手动？',
      choices: ['automatic', 'manual']
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
        message: '请选择以下工具？',
        choices: ['mock', 'husky', 'css-reset', 'axios-strong']
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
