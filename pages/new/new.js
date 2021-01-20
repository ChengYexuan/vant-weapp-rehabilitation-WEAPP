// pages/new/new.js
//import Toast from 'path/to/@vant/weapp/dist/toast/toast';

Page({
  data: {
    age: null,
    sex: ['a', 'b'],
    sex:false,
    
    illness:['i1','i2','i3','i4','i5','i6','i7'],
    illness:false,
    illtime:['time1','time2','time3'],
    illtime:false,
    exercise:['ex1','ex2','ex3'],
    exercise:false,
    value: '',
    
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
      illness: event.detail,
    });
  },

  onChange_time(event) {
    this.setData({
      illtime: event.detail,
    });
  },

  onChange_ex(event) {
    this.setData({
      exercise: event.detail,
    });
  },


  // 事件处理函数
  onConfirm:function() {
    // wx.request({
    //   url : app.globalData.ipstar + "/plan/new",
    //   method: "POST",
    //   header: {
    //     "content-type": "application/x-www-form-urlencoded" 
    //   },
    //   data: {
    //     result : JSON.stringify(this.data.result)
    //   },
    //   success: function (res) {
    //     console.log(res.data);
    //     wx.switchTab({
    //       url: '../train/train',
    //     })
    //     wx.showToast({
    //       title: '创建成功！',
    //       icon: 'success',
    //       duration: 2000
    //     })
    //   },

    // }),
    
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

