/* 
1 在onLoad生命周期事件中 获取 goods_id
2 封装请求 获取数据
3 再去渲染页面  
4 图片预览功能
  1 给图片绑定点击事件
5 加入购物车
  1 点击事件触发
  2 获取本地存储中的 购物车数据 cart 对象 格式 很类似 收藏的对象 
      要确保 这个是数据 是一个对象格式 
  3 判断 这个对象当中 有没有 要添加购物车的 商品对象
  4 不存在 就创建  同时 给 这个商品对象 加一个属性 count=1 数量的意思 
  5 已经存在 获取  count++；
  6 把 新的数据 重新 填充到 本地存储中  
 */

// 引入 request 请求
const {
  request
} = require("../../utils/request.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_all: {},
    big_pics: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const {
      goods_id
    } = options;
    this.getDetailData(goods_id);
  },
  // 封装请求 获取数据
  getDetailData(goods_id) {
    request({
      url: 'goods/detail',
      data: {
        goods_id
      }
    }).then(res => {
      // IOS 平台下不支持 webp 图片格式，需要通过正则表达式替换成普通 jpg
      res.goods_introduce = res.goods_introduce.replace(/\?.+?webp/g, '');
      // console.log(res.goods_introduce);
      // 把返回值中图片进行处理，处理成预览大图时候使用的数组字符串格式
      const big_pics = res.pics.map((item, index) => {
        return item.pics_big
      });
      // 更新数据
      this.setData({
        goods_all: res,
        big_pics
      });
    });
  },
  // previewImage 图片预览功能
  previewImage(event) {
    const {
      current
    } = event.currentTarget.dataset;
    console.log(current);
    // 调用预览大图方法
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls: this.data.big_pics // 需要预览的图片http链接列表
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