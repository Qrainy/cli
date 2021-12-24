import Mock from 'mockjs'
import Test from './mock.test'

const data = {
  ...Test
}

if (process.env.NODE_ENV === 'development') {
  createMockData()
}

function createMockData () {
  Mock.XHR.prototype.withCredentials = true
  Mock.setup({
    timeout: '10-600'
  })
  for (let key in data) {
    let url = new RegExp(key.replace(/\//g, '\\/'))
    Mock.mock(url, data[key])
  }
}
