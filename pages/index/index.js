//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    weight: 60,
    height: 175,
    BMI: 19.6,
    imgUrls:[
      '../../images/index1.png',
      '../../images/index2.png',
      '../../images/index3.png',
      '../../images/index4.png',
    ],
  },

  onLoad: function() {
    var that = this;
    wx.request({
      url: 'url',
      success:function(res){
        that.setData({
          weight:res.weight,
          height:res.height,
          BMI:res.weight/res.height
        });
      }
    });
  },

  onShow: function () {
    // 每个 tab 页下的自定义 tabBar 组件实例是不同的，可通过自定义组件下的 getTabBar 接口，获取当前页面的自定义 tabBar 组件实例。
    // 不然会发生tabbar中selected与实际上的index不同
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },

  toPageNew:function(){
    wx.switchTab({
      url: '/pages/new/new',
    })
  },
  toPageTrain:function(){
    wx.switchTab({
      url: '/pages/train/train',
    })
  },
  toPageHistory:function(){
    wx.switchTab({
      url: '/pages/history/history',
    })
  }  
})
