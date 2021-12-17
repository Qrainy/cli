const download = require('download-git-repo')

const gitHubUrl = 'https://github.com/Qrainy/cli-vue-demo.git'
const gitHubUrlSpare = 'direct:git@github.com:Qrainy/cli-vue-demo.git#master'

function main(name) {
  return new Promise((resolve, reject) => {
   
    downloadDemo(gitHubUrl)

    function downloadDemo(url, isEnd = false) {
      download(url, name, { clone: true }, function (err) {
        if (err) {
          if (isEnd) {
            reject(err)
          } else {
            // 下载备用地址
            downloadDemo(gitHubUrlSpare, true)
          }
        }
        resolve('模板拉取成功~')
      })
    }
  })
}

module.exports = main
