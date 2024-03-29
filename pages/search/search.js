// 导入 request 方法
const {
  request
} = require('../../utils/request.js')

// 创建变量用于存放定时器
let timer;

// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: "",
    // 搜索历史列表
    historyList: [],
    // 搜索提示列表
    tipsList: [],
    // 是否显示搜索提示框
    showTips: false
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const {
      keyword
    } = options;
    this.setData({
      keyword
    });
  },

  // bindinput - 当用户键盘输入时触发
  inputChange(event) {
    const {
      value
    } = event.detail;

    this.setData({
      keyword: value
    });

    // 如果用户清空了输入的值
    if (!value.trim()) {
      // 隐藏提示盒子
      this.setData({
        showTips: false
      });
      // 减少发送空数据
      return;
    } else {
      this.setData({
        showTips: true
      });
    }
    // 清空上一个定时器
    clearTimeout(timer);
    // console.log(value);
    // 通过定时器节流
    timer = setTimeout(() => {
      // 当用户输入内容发生改变的时候，获取搜索提示
      this.getSearchTipsData(value);
    }, 500);
  },

  // 获取搜索提示
  getSearchTipsData(query) {
    request({
        url: 'goods/qsearch',
        data: {
          query
        }
      })
      .then(res => {
        console.log(res);
        this.setData({
          tipsList: res || []
        })
      })
  },

  // bindconfirm="inputSumbit" - 当用户点击键盘右下角搜索按钮的时候触发
  inputSumbit(event) {
    const {
      value
    } = event.detail;
    // console.log(value);
    // 1. 先把数据展示到页面中
    // 1.1 获取页面数据
    let {
      historyList
    } = this.data;
    // 1.2 搜索的数据前添加数据
    historyList.unshift(value);
    // 1.3 数组去重
    historyList = [...new Set(historyList)]
    // 1.4 更新数据
    this.setData({
      historyList
    });

    // 2. 把数据更新到本地存储中
    // 异步写法
    // wx.setStorage({
    //   // 键名称需要写成字符串
    //   key: 'historyList',
    //   // 数据应该保留格式
    //   data: historyList
    // });
    // 同步写法
    wx.setStorageSync('historyList', historyList);
    // 按完成的时候也要跳转页面
    wx.redirectTo({
      url: '/pages/goods_list/goods_list?keyword=' + value,
    });
  },
  // 获取焦点
  inputFocus() {
    this.setData({
      showTips: true
    });
  },
  // 获取焦点
  inputBlur() {
    this.setData({
      showTips: false
    });
  },
  // 点击叉叉移除搜索历史
  removeHistory() {
    // 1. 视图更新
    this.setData({
      historyList: []
    });
    // 2. 本地存储更新
    wx.removeStorageSync('historyList');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      // 获取本地存储的搜索历史，如果没有历史，设置成空数组 []
      historyList: wx.getStorageSync('historyList') || []
    });
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