//app.js
App({
  onLaunch: function () {

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     // if (res.code) {
    //     //   //发起网络请求
    //     //   wx.request({
    //     //     url: 'https://test.com/onLogin',
    //     //     data: {
    //     //       code: res.code
    //     //     }
    //     //   })
    //     // } else {
    //     //   console.log('登录失败！' + res.errMsg)
    //     // }
    //   }
    // })

    // 获取用户授权列表
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 之前已经使用过该小程序并授权，可以直接调用 getUserInfo 不会弹框
          console.log('之前已经使用过该小程序并授权，app.js有权限获取用户信息')
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              this.globalData.id = res.userInfo.nickName
              this.globalData.gender = res.userInfo.gender
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
        else{
          console.log('app.js没有权限获取用户信息')
        }
      }
    })

  },
  globalData: {
    userInfo: null,
    id: null,
    gender: null,
    ipstr: "http://47.114.156.165:12306/",
    serialNo: null,
    index: null, //动作序号
    progressTime: null //动作进度
  }
})