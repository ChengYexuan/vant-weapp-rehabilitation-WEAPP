//login.js
//获取应用实例
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    hasUserInfo:false,
    userInfo:{},
    wxLogoURL:app.globalData.ipstr+"/images/wxLogo.png",
    imgBgURL:app.globalData.ipstr+"/images/loginBG_1.jpg",
  },

  /**
   * 点击 开始训练 按钮时--转到主页面
   */
  toPageIndex:function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  /**
   * 页面加载时--查看是否授权，已授权则获取openid，未授权则显示授权页面
   */
  onLoad: function() {
    var that = this;
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          console.log('已授权，login.js登录换取openid。')
          wx.getUserInfo({
            success: function(res) {
            //用户授权成功后，调用微信的 wx.login 接口，从而获取code
              wx.login({
                success: res => {
                  //获取openid
                  // wx.request({
                  //   url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx18ed1ca25953d92b&secret=1906dab1d235f2fe97fad7fe7f67de47&js_code=' + res.code + '&grant_type=authorization_code',
                  //   success:res=>{
                  //   }
                  // })
                }
              });
            }
          });
        } 
        else {
          // 用户没有授权，改变 isHide 的值，显示授权页面
          console.log('之前没有授权过，login显示授权页面')
          that.setData({
            isHide: true
          });
        }
      }
    });

  },

  /**
   * 授权选择完成后--授权成功并注册新用户
   */
  bindGetUserInfo: function(e) {
    console.log('完成授权选择')
    if (e.detail.userInfo) {//用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("授权成功，用户的信息如下：");
      console.log(e.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false,
      });
      //赋值全局变量
      app.globalData.userInfo = e.detail.userInfo;
      app.globalData.id = e.detail.userInfo.nickName;
      app.globalData.gender = e.detail.userInfo.gender
      //赋值data
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      //授权成功后，注册新用户
      console.log('自动注册新用户')
      wx.request({
        url: app.globalData.ipstr+"/user/new",
        method:'POST',
        data:{
          // userID:e.detail.userInfo.nickName,
          userID:'cyx',
          sex:e.detail.userInfo.gender,
        },
        header:{
          "Content-Type":"application/x-www-form-urlencoded"
        },
        success:function(res){
          console.log(res.data.message);
        }
      })
    } 
    else {//用户按了拒绝按钮
      console.log('用户拒绝授权')
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
