export default {
  "api/v1/get_user_info": {
    "code": 0,
    "message": 'ok',
    "data": {
      // 用户头像
      "avatar": "@image('150x120', '#ff0000', '1909A')",
      // 用户名称
      "name|2-10": "@ctitle",
      // 出生日期
      "start_time": "@date('yyyy-MM-dd HH:mm:ss')",
      // 是否为VIP,
      "is_vip|1": [0, 1],
      // 用户朋友
      "item|1-20": [
        {
          "id|+1": 1,
          "friend_name|2-10": "@ctitle",
        }
      ]
    }
  }
}
