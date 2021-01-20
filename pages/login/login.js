//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    hasUserInfo:false,
    userInfo:{},
    imgBgURL:app.globalData.ipstr+"images/loginBGG_1.jpg",
  },

  toPageIndex:function(){
    console.log("login2index");
    // wx.getUserInfo({
    //   success: res => {
    //     app.globalData.userInfo = res.userInfo
    //     app.globalData.userID = res.userID
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // }),
    console.log(app.globalData.userInfo.nickName);
    
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  onLoad: function() {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
            //用户授权成功后，调用微信的 wx.login 接口，从而获取code
              wx.login({
                success: res => {
                  console.log("用户的code:" + res.code);
                  //获取openid
                  wx.request({
                    url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx18ed1ca25953d92b&secret=1906dab1d235f2fe97fad7fe7f67de47&js_code=' + res.code + '&grant_type=authorization_code',
                    success:res=>{
                      console.log("openid:"+res.data.openid);
                    }
                  })
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

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {//用户按了允许授权按钮
      var that = this;
      console.log(e.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false,
      });
      //赋值全局变量
      app.globalData.userInfo = e.detail.userInfo;
      app.globalData.id = e.detail.userInfo.nickName;
      //授权成功后，注册新用户
      wx.request({
        url: app.globalData.ipstr+"/user/new",
        method:'POST',
        data:{
          userID:e.detail.userInfo.nickName,
          sex:e.detail.userInfo.gender,
        },
        header:{
          "Content-Type":"application/x-www-form-urlencoded"
        },
        success:function(res){
          console.log(res.data);
        }
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
