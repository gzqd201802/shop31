Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 首页轮播图的初始数据
    slider: [],
    // 初始化入口数据
    entry: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 1.0 页面加载的时候，请求轮播图的数据
    this.getSliderData();
    // 2.0 调用请求入口数据方法
    this.getEntryData();
  },

  // 1.0 封装请求轮播图的方法
  getSliderData() {
    // wx.request 请求方法
    wx.request({
      // url 请求地址
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      // success 请求成功执行的回调函数
      success: res => {
        // 输出 res 返回值查看结构
        console.log(res);
        // 数据解构 message
        const {
          message
        } = res.data;
        // 把 message 数据更新到页面 data 中
        this.setData({
          slider: message
        });
      }
    });
  },

  // 2.0 封装请求首页入口数据
  getEntryData() {
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
      success: res => {
        // 解构数据
        const {
          message
        } = res.data;
        // 设置数据
        this.setData({
          entry: message
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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