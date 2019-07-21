// 引入腾讯地图 sdk 包
const QQMapWX = require('../../lib/qqmap/qqmap-wx-jssdk.js');

// 实例化API核心对象，对象调用方法实现功能
let qqmapsdk  = new QQMapWX({            
  key: '53IBZ-7X36X-CWE4D-TKKLE-T7K3V-STBS3'        
});

// console.log(qqmapsdk);

// map.js
Page({
  data: {
    // 地图标记
    markers: [],
    // 当前位置
    current: {
      longitude: "113.324520",
      latitude: "23.099994"
    },
    // 地图标记路线
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
  },

  onShow() {
    this.getPosition();

    this.getSearch();

  },

  // 获取当前位置
  getPosition() {
    // 参考收货地址用户授权写法
    wx.getLocation({
      type: 'wgs84',
      success: res => {
        // console.log(res);
        const {
          latitude,
          longitude
        } = res;

        const marksItem = {
          iconPath: "/images/smile.png",
          id: 0,
          latitude,
          longitude,
          width: 50,
          height: 50
        }

        const current = {
          latitude,
          longitude
        }

        const {
          markers
        } = this.data;
        
        markers.push(marksItem)

        this.setData({
          markers,
          current
        });

      }
    })
  },

  // 调用LBS 的搜索功能
  getSearch() {

    const {
      current,
      markers
    } = this.data;
    qqmapsdk.search({
      // 搜索关键词
      keyword: '吃',
      // 基于那个坐标搜索
      location: `${current.latitude},${current.longitude}`,
      success: res => {
        const {
          data
        } = res;

        console.log(data);
        const mks = data.map(item => {
          return {
            title: item.title,
            id: item.id,
            latitude: item.location.lat,
            longitude: item.location.lng,
            iconPath: "/images/car.png", //图标路径
            width: 20,
            height: 20
          }
        });

        this.setData({
          markers: [...markers, ...mks]
        });


      }

    })
  },

})