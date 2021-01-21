// pages/me/me.js
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    currentAge: '暂无',
    currentSexIndex: 0,
    currentHeight: '暂无',
    currentWeight: '暂无',
    currentPhoneNum: '暂无',
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 每个 tab 页下的自定义 tabBar 组件实例是不同的，可通过自定义组件下的 getTabBar 接口，获取当前页面的自定义 tabBar 组件实例。
    // 不然会发生tabbar中selected与实际上的index不同
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 4
      })
    }

  // 拉取后端数据
    wx.request( {
      url: app.globalData.ipstr + "/user/info",
      data:{
        userID: app.globalData.id
        // userID: "wdyabcd"
      },
      success: res => {
        console.log(res.data),
        this.setData({
          currentAge: res.data.data.age,
          currentSexIndex: res.data.data.sex,
          currentHeight: res.data.data.height,
          currentWeight: res.data.data.weight,
          currentPhoneNum: res.data.data.phoneNum
        })
      }
    })
    const sexDict = [{'sex': '未知'}, {'sex': '男'}, {'sex': '女'}]
    this.setData({
      currentSex: sexDict[this.data.currentSexIndex].sex
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  toMeDetails: function () {
    // wx.navigateTo({
    //   url: '../me/medetails'
    // })
    wx.navigateTo({
      url: '../me/medetails?obj=' + JSON.stringify({
        currentAge: this.data.currentAge,
        currentSexIndex: this.data.currentSexIndex,
        currentHeight: this.data.currentHeight,
        currentWeight: this.data.currentWeight,
        currentPhoneNum: this.data.currentPhoneNum}),
    })
  },

  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
