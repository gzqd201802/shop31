const {
  request
} = require("../../utils/request.js");


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品列表关键词
    keyword: "",
    activeIndex: 0,
    goods: [],
    cid: 0,
    pagenum: 1,
    pagesize: 20,
    // 是否还有更多数据
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 在页面生命周期函数中，可以通过 options 获取页面传递的参数
    console.log(options);
    const {
      keyword,
      cid
    } = options;
    const {
      pagenum,
      pagesize
    } = this.data;

    this.setData({
      keyword,
      cid
    });

    // 调用请求方法的时候，传递四个参数
    this.getListData({
      query: keyword,
      cid,
      pagenum,
      pagesize
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // console.log("上拉触底事件触发了");
    // 继续发起数据请求，但是页数应该要加 1
    let {
      keyword,
      cid,
      pagenum,
      pagesize,
      hasMore
    } = this.data;

    // 判断是否没有更多数据了，直接 return
    if (!hasMore) return;

    // 页数++，加1
    pagenum++;
    // 更新页面数据
    this.setData({
      pagenum
    });
    // 根据新数据，重新根据新的页码发起请求
    this.getListData({
      keyword,
      cid,
      pagenum,
      pagesize
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    console.log("用户下拉刷新事件触发");
    // 在事件内部，重新请求数据
    // 页码重新变成第一页，goods 数据清空, hasMore 变成 true
    let {
      pagenum,
      cid,
      pagesize,
      keyword,
      goods,
      hasMore
    } = this.data;

    // 重新把数据初始化
    pagenum = 1;
    goods = [];
    hasMore = true;

    // 更新页面数据
    this.setData({
      pagenum,
      goods,
      hasMore
    });

    // 重新发起请求
    this.getListData({
      query: keyword,
      cid,
      pagenum,
      pagesize
    });

  },

  // 获取列表数据
  getListData(params) {
    const {
      pagesize
    } = this.data;

    // 还有数据的时候，才继续发起请求
    request({
        url: "goods/search",
        data: {
          ...params
        }
      })
      .then(res => {
        // console.log(res);
        const {
          goods
        } = res;

        // 判断是否还有数据，如果没有数据，就把 hasMore 变量改成 false
        if (goods.length < pagesize) {
          // 如果没有数据 hasMore ，修改成 false
          this.setData({
            hasMore: false
          });
          // 没有数据显示消息提示框
          wx.showToast({
            title: '没有更多数据了',
            // 取消掉提示图标
            icon: 'none'
          });
        }

        // 更新列表数据，数组拼接
        this.setData({
          // 把原本的数据展开，新数据展开，连接一份新数组
          goods: [...this.data.goods, ...goods]
        });

        // 停止当前页面下拉刷新动画效果 -- 手机中下拉后，动画会持续，需要调用方法停止
        wx.stopPullDownRefresh();
      })
  },
  // 点击跳转详情页事件
  goToDetail(event){
    // 提取商品 id
    const { id } = event.currentTarget.dataset;
    // 在跳转页面的时候把 id 传递过去
    // console.log(id);
    wx.navigateTo({
      url: '/pages/goods_detail/goods_detail?goods_id=' + id,
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
    console.log("onUnload");
  },




  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})