App({

  // 全局数据 - 名字可以自己取
  globalData: {
    msg: '全局数据'
  },

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function() {
    console.log("onLaunch（全局只触发一次）");
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function(options) {
    console.log("onShow--全局触发，主要是小程序最小化，再显示的时候执行");
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function() {
    console.log("onHide--全局触发，主要是最小化的时候自动执行");
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function(msg) {

  }
})