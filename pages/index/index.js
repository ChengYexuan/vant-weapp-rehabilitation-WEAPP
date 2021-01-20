//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    weight: 60,
    height: 175,
    BMI: 19.6,
    imgUrls:[
      app.globalData.ipstr+"images/index1.png",
      app.globalData.ipstr+"images/index2.png",
      app.globalData.ipstr+"images/index3.png",
      app.globalData.ipstr+"images/index4.png",
    ],
    btn1ImgUrl: app.globalData.ipstr+"images/myPlanIcon1.png",
    btn2ImgUrl: app.globalData.ipstr+"images/myPlanIcon2.png",
    btn3ImgUrl: app.globalData.ipstr+"images/myPlanIcon3.png",
  },

  /**
   * 页面加载时--拉取后端用户信息
   */
  onLoad: function() {
    var that = this;
    wx.request({
      url: app.globalData.ipstr+"/user/info",
      method:'GET',
      data:{
        userID:app.globalData.id
        //userID:"wdyabcd"
      },
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        console.log(res.data);
        that.setData({
          weight:res.data.data.weight,
          height:res.data.data.height,
          BMI:(res.data.data.weight/res.data.data.height/res.data.data.height*10000).toFixed(2)
        })
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
