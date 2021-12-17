const download = require('download-git-repo')

const gitHubUrl = 'direct:https://github.com/Qrainy/cli-vue-demo.git#master'

function main(projectName) {
  return new Promise((resolve, reject) => {
    download(gitHubUrl, projectName || 'vue-demo', { clone: true }, function (err) {
      if (err) {
        reject(err)
      }
      resolve('模板拉取成功~')
    })
  })
}

module.exports = main
