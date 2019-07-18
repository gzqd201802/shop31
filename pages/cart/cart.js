// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {
      userName: '',
      telNumber: '',
      addressInfo: ''
    }
  },
  // 调用收货地址功能
  chooseAddress() {
    // 把收货地址的功能封装，因为用户可能点击了不授权，需要特殊处理
    this.chooseAddressMain();
  },

  // 选择收货地址的核心函数
  chooseAddressMain() {
    // 微信内部原生的收货地址界面，而且所有小程序收货地址信息都是互通的
    wx.chooseAddress({
      success: res => {
        console.log(res);
        const {
          userName,
          telNumber,
          provinceName,
          cityName,
          countyName,
          detailInfo
        } = res;
        const address = {
          userName,
          telNumber,
          addressInfo: provinceName + cityName + countyName + detailInfo
        }
        // 把地址设置到页面中
        this.setData({
          address
        });

        // 保存到本地存储中
        wx.setStorageSync('address', address);
      }
    });
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      address: wx.getStorageSync('address') || {}
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})