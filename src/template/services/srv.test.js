import request from './request'

//
/**
 * 获取用户信息
 *
 * 示例：
 * 
 *   一、 async-await
 *
 *        async function getUserInfo () {
 *           try {
 *             const data = await getUserInfoApi()
 *           } catch (err) {
 *             // error handling
 *           }
 *         }
 *   二、.then
 *
 *     function getUserInfo () {
 *        getUserInfoApi.then(res => {
 *         //
 *       }).catch(err => {
 *         //
 *       })
 *     }
 *
 */
export function getUserInfoApi () {
  return request.get('api/v1/get_user_info')
}
