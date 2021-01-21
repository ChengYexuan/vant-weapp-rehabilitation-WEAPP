// pages/train/train.js
const app = getApp()
import wxCharts from '../../utils/wxcharts.js'

const Doc = require('../../static/docu.js')
const document = Doc.planDoc

Page({
  data: {
    planID: null,
    planName: '',
    finished: 0,
    unfinished: 15,
    mission: '',
    step: [], //训练计划步骤
    active: 0, //当前步骤
    sec: 0, //当前步骤的进度时间
    list: [], //方案中的动作
    flag: 0, //新老用户标识
  },

  /**
   * 加载页面时--拉取后端数据、更新全局变量、更新绑定数据
   */
  onLoad: function () {
 
  },
 
  /**
   * 显示页面时--画图
   */
  onShow: function () {
    // 每个 tab 页下的自定义 tabBar 组件实例是不同的，可通过自定义组件下的 getTabBar 接口，获取当前页面的自定义 tabBar 组件实例。
    // 不然会发生 tabbar 中 selected 与实际上的 index 不同的情况
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }

    var percent = 0
    var finished = 0
    var unfinished = 15
    var week = [0, 0, 0, 0, 0, 0, 0]

    // 雷达图
    var radarChart = new wxCharts({
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
    var ringChart = new wxCharts({
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
  
    //获取今日日期并格式化
    var date = new Date();
    var nowMonth = date.getMonth() + 1;
    var strDate = date.getDate();
    var seperator = "/";
    //对月份进行处理，1-9月在前面添加一个“0”
    if (nowMonth >= 1 && nowMonth <= 9) {
      nowMonth = "0" + nowMonth;
    }
    //对日进行处理，1-9号在前面添加一个“0”
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }

    //查询今日是否有训练记录，共三种情况
    wx.request( {
      url: app.globalData.ipstr + "/plan/today",
      data:{
        userID: app.globalData.id,
        date: date.getFullYear() + seperator + nowMonth + seperator + strDate
      },
      success: res => {
      // fail: res => {
        console.log(res.data)
        this.setData({
          // planID: 0,
          planID: res.data.data.planID,
          // active: 0+1,
          active: res.data.data.actionNum + 1, //步骤条的序号
          // sec: 30,
          sec: res.data.data.actionSec
        })
        app.globalData.progressTime = this.data.sec
        app.globalData.index = this.data.active - 1
        app.globalData.serialNo = res.data.data.serialNo
        app.globalData.planID = this.data.planID
        //获取No.planID方案的文档
        var planName = document[this.data.planID].title
        var mission = document[this.data.planID].mission
        var step = document[this.data.planID].exer
        var list = []
        //获取动作组合
        const exer = Doc.composeExer(planName)[0] //返回Array只有一个元素，该元素内有五个对象
        for (let i = 0; i < exer.length; i++) {
          list.push({
            title: exer[i].title,
            desc: exer[i].time,
            thumb: exer[i].url,
            num: exer[i].set,
          })
        }
        this.setData({
          planName: planName,
          mission: mission,
          step: step,
          active: app.globalData.index,
          list: list,
          flag: 0
          // flag: res.data.data.newUser
        })
      }
    })
  },

  seePlan: function (e) {
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: './start?obj=' + JSON.stringify({
        exerName: this.data.list[index].title,
        flag: false,
        index: index
      })
    })
  },

  startPlan: function () {
    wx.navigateTo({
      url: './start?obj=' + JSON.stringify({
        exerName: this.data.list[this.data.active].title,
        flag: true,
        index: this.data.active
      })
    })
  }
})
