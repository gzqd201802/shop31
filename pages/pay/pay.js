const {
  request
} = require("../../utils/request.js");

// 小程序使用 async await 语法的时候，会报错，解决办法：引入 regeneratorRuntime 包
const regeneratorRuntime = require("../../lib/runtime/runtime.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收货地址
    address: {},
    // 购物车集合
    cartList: {},
    // 总合计价格
    totalPrice: 0,
    // 总选中个数
    accountCount: 0,
  },

  // 封装计算价格和个数的方法
  setTotalPrice() {

    const {
      cartList
    } = this.data;

    // 合计总价格
    let totalPrice = 0;
    // 结算时选中商品个数
    let accountCount = 0;
    // 计算选中的商品的总价格

    // 遍历购物车集合 value
    Object.values(cartList).forEach(item => {
      // 遍历数据中选中状态商品
      if (item.selected) {
        // 计算商品总价格
        totalPrice += item.goods_price * item.count;
        // 计算个数
        accountCount++;
      }
    });

    // 更新视图
    this.setData({
      totalPrice,
      accountCount
    })

  },

  // 需要实现微信支付
  async payHandle() {

    // 1. 先检验本地有没有 token，没有 token 就跳转到登录授权


    // 支付流程 - 要按顺序执行 - 如何从上往下执行 - 可以封装成方法，内部返回 Promise 对象
    const {
      cartList,
      address,
      totalPrice
    } = this.data;

    // 创建用于创建订单的商品对象
    const goods =
      // 遍历购物车集合的 keys
      Object.keys(cartList)
      // filter 过滤选中状态的商品
      .filter(id => cartList[id].selected)
      // map 返回新对象，用于创建订单
      .map(id => {
        return {
          goods_id: cartList[id].goods_id,
          goods_price: +cartList[id].goods_price,
          goods_number: cartList[id].count
        }
      });

    // 创建订单
    const params = {
      "order_price": totalPrice,
      "consignee_addr": address.addressInfo,
      "goods": goods
    }

    try {
      // 1. 创建订单，获取订单编号
      const {
        order_number
      } = (await this.getOrderNumber(params));
      console.log(order_number, '1. 创建订单，获取订单编号');
      // 2. 根据订单编号，准备预支付
      const {
        pay
      } = await this.getPrePay(order_number);
      console.log("2. 根据订单编号，准备预支付", pay);
      // 3. 根据预支付数据发起微信支付 - 微信支付在模拟器中是扫码，手机是弹起支付界面
      const res = await this.getRequestPayment(pay);
      console.log('3. 根据预支付数据发起微信支付', res);
      // 4. 微信支付成功后，查询订单，更新订单状态
      const res2 = await this.getOrderCheck(order_number);
      console.log('4. 微信支付成功后，查询订单，更新订单状态', res2);

      // try 如果走到最后，说明支付成功，提示用户
      wx.showToast({
        title: '支付成功',
      });

      // 删除本地存储选中的商品的数据
      // 获取 cartList 所有键名称，也就是 id
      Object.keys(cartList)
        // 过滤购物车数据中，选中状态商品的 id 值
        .filter(id => cartList[id].selected)
        // 遍历选中状态 id 值，从购物车数据中删除。
        .forEach(id => {
          delete cartList[id]
        });

      // 把新的购物车数据更新到本地存储
      wx.setStorageSync('cartList', cartList);

      wx.redirectTo({
        url: '/pages/order/order?type=3',
      });

    } catch (err) {
      console.log('捕获报错信息', err);
      wx.showToast({
        title: '支付失败',
        icon: 'none'
      });
    }

  },
  // 1.创建订单，获取订单编号
  getOrderNumber(params) {
    // 调用接口，需要带上 token
    return request({
      url: 'my/orders/create',
      method: "POST",
      data: {
        ...params
      }
    })
  },
  // 2. 根据订单编号，准备预支付
  getPrePay(order_number) {
    return request({
      url: 'my/orders/req_unifiedorder',
      method: 'POST',
      data: {
        order_number
      }
    })
  },
  // 3. 根据预支付数据发起微信支付
  getRequestPayment(pay) {
    // 把微信方法改造封装成 Promise 写法
    return new Promise((resolve, reject) => {
      wx.requestPayment({
        ...pay,
        success: (res) => {
          resolve(res);
        },
        fail: (res) => {
          reject(res);
        }
      });
    })
  },
  // 4. 微信支付成功后，查询订单，更新订单状态
  getOrderCheck(order_number) {
    return request({
      url: 'my/orders/chkOrder',
      method: 'POST',
      data: {
        order_number
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    // 获取购物车列表
    const cartList = wx.getStorageSync('cartList') || {};

    // 更新数据
    this.setData({
      address: wx.getStorageSync('address') || {},
      cartList,
    });
    // 
    this.setTotalPrice();
  },

})