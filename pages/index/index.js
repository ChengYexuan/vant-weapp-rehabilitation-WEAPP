//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    weight: 60,
    height: 175,
    BMI: 19.6,
    pressureArray: [],
    pressureIndex: [0, 0],
    imgUrls:[
      '../../images/index1.png',
      '../../images/index2.png',
      '../../images/index3.png',
      '../../images/index4.png',
    ],
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false
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

    
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
            //用户授权成功后，调用微信的 wx.login 接口，从而获取code
              wx.login({
                success: res => {
                  // 获取到用户的 code 之后：res.code
                  console.log("用户的code:" + res.code);
                  // wx.request({
                  //   url: 'https://api.weixin.qq.com/sns/jscode2session?appid=自己的APPID&secret=自己的SECRET&js_code=' + res.code + '&grant_type=authorization_code',
                  //   success:res=>{
                  //     console.log("用户的openid:"+res.data.openid);
                  //   }
                  // })
                }
              });
            }
          });
        } 
        else {
          // 用户没有授权，改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
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
  },

  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {//用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
    } 
    else {//用户按了拒绝按钮
      wx.showModal({
        title: '~注意~',
        content: '拒绝授权将无法正常使用小程序，请授权后再进入',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  }

  
})
