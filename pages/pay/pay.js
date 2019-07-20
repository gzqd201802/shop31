// 获取 app 全局实例
const app = getApp();
console.log('全局实例例子', app.globalData);

// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收货地址
    address: {},
    // 购物车集合
    cartList: {},
    // 全选状态
    selectAllStatus: false,
    // 总合计价格
    totalPrice: 0,
    // 总选中个数
    accountCount: 0,
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    let cartList = wx.getStorageSync('cartList') || {}

    this.setData({
      address: wx.getStorageSync('address') || {},
      cartList,
    });
  },

})