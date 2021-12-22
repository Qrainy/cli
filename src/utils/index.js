

const fsExt = require('fs-extra')
const path = require('path')
const files = fsExt.readdirSync(path.resolve(__dirname, '../utils'))

let data = {}

// 注入
files.forEach(element => {
  if (/^index.js$/.test(element)) {
    return
  }
  if (/.js$/.test(element)) {
    data = {
      ...require('./' + element),
      ...data
    }
  }
})

module.exports = data
