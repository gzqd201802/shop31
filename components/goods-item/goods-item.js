// components/goods-item/goods-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 接收父级传过来的数据
    item: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 组件的事件需要写到 methods，而页面的事件是和生命周期函数同级
    // 点击跳转到详情页
    goToDetail(event) {
      const {
        id
      } = event.currentTarget.dataset;
      wx.navigateTo({
        url: '/pages/goods_detail/goods_detail?goods_id=' + id,
      });
    }
  }
})