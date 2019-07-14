// 在 Page() 入口函数前，导入 request 模块，注意这里的路径
const { request } = require("../../utils/request.js")

// Page() 页面入口函数
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 左侧选中状态的索引值
    activeIndex: 0,
    // 分类总数据
    classify: [],
    // 右侧二级分类
    subClassify: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("onLoad--监听页面加载");
    this.getClassifyData();
  },
  // 切换选项卡的事件
  changeTab(event) {
    // 解构索引值
    const {
      index
    } = event.currentTarget.dataset;
    // 设置数据，更新视图
    this.setData({
      // 左侧选中状态
      activeIndex: index,
      // 右侧二级分类数据 - 可以在总数据中,通过索引值进行重新的绑定
      subClassify: this.data.classify[index].children
    });
  },
  // 
  getClassifyData() {
    // console.log(request);
    // 调用自己封装的 request 方法，更简单的发送请求
    request({ url: "categories" })
    // 成功时候执行的回调函数
    .then(res=>{
      // 设置页面数据
      this.setData({
        classify: res,
        subClassify: res[this.data.activeIndex].children
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log("onReady--监听页面初次渲染完成");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log("onShow--监听页面显示");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log("onHide--监听页面隐藏");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log("onUnload--监听页面卸载");
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