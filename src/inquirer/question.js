
const question = [
  {
    type: 'list',
    name: 'method',
    message: '请选择自动还是手动？',
    choices: ['automatic', 'manual']
  },
  {
    type: 'rawlist',
    name: 'tools',
    message: '请选择以下工具？',
    choices: ['mock', 'husky', 'css-reset', 'axios-strong']
  },
]

module.exports = question