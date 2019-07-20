// 引入 request 请求
const {
  request
} = require("../../utils/request.js");


Page({

  // 点击登录授权按钮触发的事件
  getUserInfo(event) {
    // 1. 获取用户信息
    const {
      encryptedData,
      iv,
      rawData,
      signature
    } = event.detail;
    // 2. 执行微信登录，获取 code
    wx.login({
      success: res => {
        const {
          code
        } = res;

        // 组装请求参数
        const params = {
          encryptedData,
          iv,
          rawData,
          signature,
          code
        }

        // 调用获取 token 的请求
        this.getTokenData(params);

      }
    })

  },

  // 登录获取 token 的封装
  getTokenData(params) {

    request({
      url: 'users/wxlogin',
      // 登录接口请求方式为 POST
      method: 'POST',
      // 请求参数
      data: {
        ...params
      }
    }).then(res => {
      // console.log(res);
      if (res) {
        const {
          token
        } = res;
        // 把 token 添加到本地存储中
        wx.setStorageSync('token', token);
        // 回退上一页
        wx.navigateBack();
      }
    })
  }


})