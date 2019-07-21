const {
  request
} = require('../../utils/request.js')

// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabsTitle: ["全部订单", "待付款", "待发货", "退款/退货"],
    activeIndex: 0,
    // 所有订单数据
    orders: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const {
      type
    } = options;
    
    this.setData({
      activeIndex: type - 1
    })
    // 调用请求订单的方法
    this.getOrderData(type);
  },

  getOrderData(type = 1) {
    request({
      url: 'my/orders/all',
      data: {
        type
      }
    }).then(res => {
      const {
        orders
      } = res;

      this.setData({
        orders
      });
    });
  },
  // tab栏事件
  changeTab(event) {
    const {
      index
    } = event.currentTarget.dataset;
    this.setData({
      activeIndex: index
    });

    this.getOrderData(index + 1);
  }
})