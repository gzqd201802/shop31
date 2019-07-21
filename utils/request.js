/* 用 promise 方式封装 request 请求方法 */

// function request(params) {
//  
// }
// 定义 request 函数，专门用于化简 request
const request = (params) => {

  // 抽离项目基本路径
  const baseURL = "https://api.zbztb.cn/api/public/v1/";

  // 判断 url 中是否包含了 my/ 路径，如果包含说明是私有路径
  // 私有路径的特征，请求头带上 token 做用户校验
  if (params.url.includes('my/')) {
    // 获取 token 
    const token = wx.getStorageSync('token');
    if (token) {
      // 在参数中添加请求头属性
      params.header = {
        ...params.header,
        "Authorization": token
      }
    } else {
      // 跳转到授权登录页面
      console.log('没有 token 跳转到登录授权页');
      wx.navigateTo({
        url: '/pages/auth/auth',
      });
      // 没有授权就退出函数，需要返回 Promise 对象，防止外部 then 的时候报错。
      return new Promise(() => {});
    }

  }

  // 1.0 在发送请求之前，先显示加载框
  wx.showLoading({
    title: '疯狂加载中...',
    // 是否显示透明蒙层，防止触摸穿透
    mask: false
  });

  // 通过 Promise 对象，把请求成功和失败的回调函数进行封装
  return new Promise((resolve, reject) => {
    // 2.0 发送请求
    wx.request({
      // 直接把所有的参数解构
      ...params,
      // 2.1 !! url 请求地址 = 基本路径 + 传入的 url
      url: baseURL + params.url,
      // 2.2 请求成功的回调函数
      success: res => {
        // 解构返回结果
        const {
          message
        } = res.data;
        // 请求成功，执行 Promise 的 resolve 回调函数
        resolve(message);
      },
      fail: err => {
        reject(err);
      },
      // 请求完成的时候
      complete: res => {
        // 3.0 隐藏加载框
        wx.hideLoading();
      }
    })
  });

}

// 把封装的方法导出
module.exports = {
  request
}