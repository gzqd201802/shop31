// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收货地址
    address: {},
    // 购物车集合
    cartList: {},
    // 全选状态
    selectAllStatus: false
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
  // 点击跳转到详情页
  goToDetail(event) {
    const {
      id
    } = event.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/goods_detail/goods_detail?goods_id=' + id,
    });
  },

  // 点击加减号修改数量
  countHandle(event) {
    // console.log("计数器事件触发");
    // 解构 id 和 num 数量
    const {
      id,
      num
    } = event.currentTarget.dataset;

    // 获取页面的 cartList 数据
    let {
      cartList
    } = this.data;

    // 对数据进行加减操作
    cartList[id].count += num;

    // 判断数量如果是小于 1，提示用户是否删除商品
    if (cartList[id].count < 1) {
      console.log("询问是否删除商品");
      wx.showModal({
        title: '是否删除当前商品',
        // 确认按钮的文字
        confirmText: '删除',
        // 颜色需要使用 #000 颜色
        confirmColor: '#eb4450',
        // 在点击按钮后的回调函数
        success: res => {
          // 点击了确认删除按钮
          if (res.confirm) {
            // 根据 id 名称删除数据
            delete cartList[id];
            // 点击了取消按钮
          } else if (res.cancel) {
            // 如果点击取消，数量变回 1
            cartList[id].count = 1;
          }
          // 异步操作后应该也要更新数据
          this.setCartListData(cartList);
        }
      })
    } else {
      // 更新数据
      this.setCartListData(cartList);
    }

  },

  // countBlur 输入框失去焦点更新数据
  countBlur(event) {
    // 获取输入框的值
    let {
      value
    } = event.detail;

    // 获取当前点击商品 id 值
    const {
      id
    } = event.currentTarget.dataset;

    // 获取购物车数据
    const {
      cartList
    } = this.data;

    // 更新商品数量
    cartList[id].count = +value;

    // 更新购物车数据
    this.setCartListData(cartList);

  },

  // 点击商品前选择按钮
  changeItemSelect(event) {
    // 获取当前商品 id
    const {
      id
    } = event.currentTarget.dataset;

    // 获取购物车数据
    const {
      cartList
    } = this.data;

    // 取反当前商品选择状态
    cartList[id].selected = !cartList[id].selected;

    // 遍历购物车集合，如果有一个商品选择状态为 false，最终结果为 false，全部 true，全选才为 true
    const selectAllStatus = Object.values(cartList).every(item => item.selected);

    // 更新全选状态
    this.setData({
      selectAllStatus
    });
    // 更新购物车数据
    this.setCartListData(cartList);

  },

  // 全选按钮点击
  changeAllSelect() {
    // 解构购物车数据和全选状态
    let {
      cartList,
      selectAllStatus
    } = this.data;

    // 全选状态点击就取反
    selectAllStatus = !selectAllStatus;

    // 遍历购物车数据，更新选中状态
    Object.keys(cartList).forEach(id => {
      cartList[id].selected = selectAllStatus;
    });

    // 更新全选状态
    this.setData({
      selectAllStatus
    });

    // 更新购物车数据
    this.setCartListData(cartList);

  },

  setCartListData(cartList) {
    // 更新界面
    this.setData({
      cartList
    });

    // 更新本地存储
    wx.setStorageSync('cartList', cartList);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    let cartList = wx.getStorageSync('cartList') || {}

    // 遍历集合，更新全选状态
    const selectAllStatus = Object.values(cartList).every(item => item.selected);

    this.setData({
      address: wx.getStorageSync('address') || {},
      cartList,
      selectAllStatus,
    });
  },
  
})