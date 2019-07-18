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
    // 用户可能点击确定或点击取消
    wx.getSetting({
      success: res => {
        console.log(res);
        // 在返回值中获取地址的授权情况
        const addressAuth = res.authSetting['scope.address'];
        // addressAuth 主要有三个返回值
        //    undefined    从来没有打开过授权
        //    false        用户在授权弹窗的时候选择了 取消
        //    true         用户在授权弹窗的时候选择了 确定
        //    用户在取消授权后，api 就不能被调用了 - 解决办法是打开授权设置
        console.log(addressAuth);
        if (addressAuth === undefined || addressAuth === true) {
          this.chooseAddressMain();
          // 用户点击了取消的情况
        } else if (addressAuth === false) {
          // 弹出设置界面
          wx.openSetting({
            success: result => {
              // 设置界面点击返回后触发 success 回调函数，再尝试调用收货地址
              this.chooseAddressMain();
            }
          });
        }
      }
    })
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