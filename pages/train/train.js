// pages/train/train.js

import wxCharts from '../../utils/wxcharts.js'
var ringChart = null
var radarChart = null
const docu = require('../../static/docu.js')
const document = docu.plan

Page({
  data: {
    planName: '',
    finished: 0, //已完成的训练时长
    unfinished: 0, //未完成的训练时长
    mission: '',
    step: [], //训练计划步骤
    active: 0, //当前步骤
    list: [], //方案中的动作
    imageURL: '../../icon/train_start.jpg',
  },

  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  onShow: function () {

    // 每个 tab 页下的自定义 tabBar 组件实例是不同的，可通过自定义组件下的 getTabBar 接口，获取当前页面的自定义 tabBar 组件实例。
    // 不然会发生 tabbar 中 selected 与实际上的 index 不同的情况
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }

    // 获取窗口宽度
    var windowWidth = 0;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    // 拉取后端数据
    var planIndex = 1 //api
    var planName = document[planIndex].title
    const exerDoc = docu.compose(planName)[0]
    var finished = 50 //api
    var unfinished = 30 //api
    var percent = finished/(finished+unfinished)*100
    var week = [9, 10, 15, 9, 8, 12, 3] //api
    var mission = document[planIndex].mission
    var step = document[planIndex].exer
    var active = 2; //api
    var list = []
    for(let i=0; i<exerDoc.length; i++){
      list.push({
        title: exerDoc[i].title,
        desc: exerDoc[i].time,
        thumb: '',
        num: exerDoc[i].set,
      })
    }

    this.setData({
      planName: planName,
      mission: mission,
      finished: finished,
      unfinished: unfinished,
      step: step,
      active: active,
      list: list
    })

    // 雷达图
    radarChart = new wxCharts({
      canvasId: 'radarCanvas',
      type: 'radar',
      categories: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
      series: [{
        name: '锻炼时长',
        data: week,
        color: '#6ED2FF'
      }],
      width: 300,
      height: 140,
      legend: false,
      extra: {
        radar: {
          max: 20
        }
      }
    });
      
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
        data: unfinished,
        stroke: false,
        color: '#E2460E'
      },  {
        name: 'finished',
        data: finished,
        stroke: false,
        color: '#99CD2C'
      }],
      disablePieStroke: true,
      width: 300,
      // 调节画布高度，但超过200后会超出可视范围
      height: 150,
      dataLabel: false,
      // 图例只能放在底部，其他位置需要关闭图例，进行自定义
      legend: false,
      background: '#f5f5f5',
      padding: 0
    });
    setTimeout(() => {
      ringChart.stopAnimation();
    }, 500);
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
   * 页面相关事件处理函数
   */
  newPlan: function (e) {
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: './start?exer=' + this.data.list[index].title,
    })
  }
})
