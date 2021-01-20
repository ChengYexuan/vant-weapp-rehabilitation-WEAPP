// pages/new/new.js
//import Toast from 'path/to/@vant/weapp/dist/toast/toast';
const app = getApp()


Page({
  data: {
    
    sex: ['a', 'b'],
    age: null,
    sex:false,

    site:['0','1','2','3','4','5','6'],
    site:false,
    stage:['0','1','2'],
    stage:false,
    intensity:['0','1','2'],
    intensity:false,
    value: '',
    checkedsite:null,
    checkedstage:null,
    checkedintensity:null,
  },
  
  onChange_num(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },

  onChange(event) {
    this.setData({
      sex: event.detail,
    });
  },

  onChange_ill(event) {
    
    
    this.setData({
      site: event.detail,
      checkedsite :event.detail,
    });
    console.log(this.data.checkedsite)
  },

  onChange_time(event) {
    
    this.setData({
      stage: event.detail,
      checkedstage:event.detail,
    });
    console.log(this.data.checkedstage)
  },

  onChange_ex(event) {
    this.setData({
      intensity: event.detail,
      checkedintensity:event.detail,
    });
    console.log(this.data.checkedintensity)
  },
  // changesite0(event){
  //   const checkedsite = 0
  //   console.log(checkedsite)
  // },

  // 事件处理函数
  onConfirm:function() {
    console.log(this.checkedsite)
    wx.request( {
      url:  "http://47.114.156.165:12306/plan/new",
      method:"POST",
      // header: {
      //   "Content-Type": "application/x-www-form-urlencoded"
      // },
      data:{
        userID: app.globalData.id,
        intensity:parseInt(this.data.checkedintensity),
        site: parseInt(this.data.checkedsite),
        stage: parseInt(this.data.checkedstage),
      },
      success: function (res) {
        console.log(res.data);
        wx.switchTab({
          url: '../train/train',
        })
        wx.showToast({
          title: '创建成功！',
          icon: 'success',
          duration: 2000
        })
      },
    })
    
  },

  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
        selected: 1
      })
    }
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

})

