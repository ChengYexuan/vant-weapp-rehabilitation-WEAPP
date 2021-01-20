//login.js
//获取应用实例
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false
  },

  toPageIndex:function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  onLoad: function() {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (!res.authSetting['scope.userInfo']) {
          // 用户没有授权，改变 isHide 的值，显示授权页面
          console.log('之前没有授权过')
          that.setData({
            isHide: true
          });
        }
      }
    });
  },

  bindGetUserInfo: function(e) {
    console.log('完成授权选择')
    if (e.detail.userInfo) {//用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("授权成功，用户的信息如下：");
      console.log(e.detail.userInfo);
      app.globalData.userInfo = e.detail.userInfo
      app.globalData.id = e.detail.userInfo.nickName
      app.globalData.gender = e.detail.userInfo.gender
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
      console.log('跳转到主页')
      wx.switchTab({
        url: '/pages/index/index',
      })
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
