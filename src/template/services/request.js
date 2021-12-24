import axios from 'axios'
import qs from 'qs'

const config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || "",
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
  // headers: {
  //   'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8",
  //   'X-Requested-With': 'XMLHttpRequest',
  // }
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

const request = {}

/**
 *
 * @param {String} url
 * @param {object} data
 * @param {object} headers
 */
request.post = (url, data = {}, headers = {}) => {
  return _axios
    .post(url, qs.stringify(data), {
      headers
    })
    .then((result) => result.data)
    .then((result) => handleResponse(result))
    .catch((err) => handleError(err))
}

/**
 *
 * @param {String} url
 * @param {object} params
 * @param {object} headers
 */
request.get = (url, params = {}, headers = {}) => {
  return _axios
    .get(url, { params }, {
      headers
    })
    .then((result) => result.data)
    .then((result) => handleResponse(result))
    .catch((err) => handleError(err))
}

// 对服务器响应数据进行容错处理
function handleResponse (result) {
  // 发生错误时的提示消息
  if (result.code !== 0) {
    result.msg = result.msg || result.message || '服务器状态码返回非0'
    throw result
  }
  return result.data
}

// 对服务器响应 “错误” 数据处理
function handleError (err) {
  const defaultErrData = {
    code: 4444,
    msg: '用户数据请求失败，请您稍后再尝试一下，非常对不起 (´；ω；`)',
    type: 'error'
  }

  console.error(err && err.response ? defaultErrData : `[Request Error] 请求失败: status: ${err.code}, statusText: ${err.msg}`)

  throw err && err.response ? defaultErrData : err
}

export default request
