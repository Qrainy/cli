import Mock from 'mockjs'
import Test from './mock.test'

Mock.XHR.prototype.withCredentials = true
Mock.setup({
  timeout: '10-600'
})

if (process.env.NODE_ENV === 'development') {
  createMockData()
}

function createMockData () {
  const data = {
    ...Test
  }
  for (let key in data) {
    let url = createReg(key)
    Mock.mock(url, data[key])
  }
}

function createReg (key) {
  return new RegExp(key.replace(/\//g, '\\/'))
}
