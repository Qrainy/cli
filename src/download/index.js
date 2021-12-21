const download = require('download-git-repo')
const gitHubUrl = 'direct:https://gitee.com/Rainy_m/cli-vue-demo.git'
const gitHubUrlSpare = 'direct:https://github.com/Qrainy/cli-vue-demo.git'

function main (name) {
  return new Promise((resolve, reject) => {
    downloadDemo(gitHubUrl)

    function downloadDemo (url, isEnd = false) {
      download(url, name, { clone: true }, function (err) {
        if (err) {
          if (isEnd) {
            reject(err)
          } else {
            // 下载备用地址
            downloadDemo(gitHubUrlSpare, true)
          }
        } else {
          resolve('模板拉取成功~')
        }
      })
    }
  })
}

module.exports = main
