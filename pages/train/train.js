// pages/train/train.js
import wxCharts from '../../utils/wxcharts.js';
var ringChart = null
var radarChart = null;
// var lineChart = null

Page({
  data: {
    finish: 0,
    unfinish: 0,
    steps: [],
    imageURL: '../../icon/train_start.jpg',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 获取窗口宽度
    var windowWidth = 0;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    
    // 后端获取
    var finish = 50;
    var unfinish = 30;
    var array = [{text: '准备'}, {text: '动作一'}, {text: '动作二'}, {text: '动作三'}, {text: '动作四'}, {text: '动作五'}];
    this.setData({
      finish: finish,
      unfinish: unfinish,
      steps: array,
    })
    var percent = finish/(finish+unfinish)*100;
     
    // 圆环图
    ringChart = new wxCharts({
      animation: true,
      canvasId: 'ringCanvas',
      type: 'ring',
      extra: {
        ringWidth: 8,
        pie: {
          offsetAngle: -45
        }
      },
      title: {
        name: percent + '%',
        color: '#000000',
        fontSize: 25
      },
      subtitle: {
        name: '今日已完成',
        color: '#000000',
        fontSize: 13
      },
      series: [{
        name: 'unfinished',
        data: unfinish,
        stroke: false,
        color: '#E2460E'
      },  {
        name: 'finished',
        data: finish,
        stroke: false,
        color: '#99CD2C'
      }],
      disablePieStroke: true,
      width: windowWidth*0.4,
      // 调节画布高度，但超过200后会超出可视范围
      height: 150,
      dataLabel: false,
      // 图例只能放在底部，其他位置需要关闭图例，进行自定义
      legend: false,
      background: '#f5f5f5',
      padding: 0
    });
    ringChart.addEventListener('renderComplete', () => {
      console.log('renderComplete');
    });
    setTimeout(() => {
      ringChart.stopAnimation();
    }, 500);

    // 雷达图
    radarChart = new wxCharts({
      canvasId: 'radarCanvas',
      type: 'radar',
      categories: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
      series: [{
        name: '成交量1',
        data: [90, 110, 125, 95, 87, 122, 0],
        color: '#6ED2FF'
      }],
      width: windowWidth*1.1,
      height: 150,
      legend: false,
      extra: {
        radar: {
          max: 150
        }
      }
    });
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
        selected: 2
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
  onClick: function () {

  },

  touchHandler: function (e) {
    console.log(radarChart.getCurrentDataIndex(e));
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
