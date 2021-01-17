// pages/new/new.js
//import Toast from 'path/to/@vant/weapp/dist/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    columns: ['计划1', '计划2', '计划3', '计划4', '计划5'],
    result: ['a', 'b'],
    result:false,
    illness:['i1','i2','i3','i4','i5','i6'],
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
      result: event.detail,
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
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

