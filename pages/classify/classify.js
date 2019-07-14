// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧选中状态的索引值
    activeIndex: 0,
    // 分类总数据
    classify: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad--监听页面加载");
    this.getClassifyData();
  },
  // 
  getClassifyData() {
    // 1.0 在发送请求之前，先显示加载框
    wx.showLoading({
      title: '疯狂加载中...',
    });
    // 2.0 发送请求
    wx.request({
      // 2.1 url 请求地址
      url: 'https://api.zbztb.cn/api/public/v1/categories',
      // 2.2 请求成功的回调函数
      success: res => {
        // 解构返回结果
        const {
          message
        } = res.data;
        // 设置页面数据，更新视图
        this.setData({
          classify: message
        })
      },
      // 请求完成的时候
      complete: res => {
        // 3.0 隐藏加载框
        wx.hideLoading();
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady--监听页面初次渲染完成");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow--监听页面显示");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide--监听页面隐藏");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload--监听页面卸载");
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})