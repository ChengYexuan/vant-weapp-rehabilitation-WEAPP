//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    weight: 60,
    height: 175,
    BMI: 19.6,
    pressureArray: [],
    pressureIndex: [0, 0],
    imgUrls:[
      '../../images/1.png',
      '../../images/2.png',
      '../../images/3.png',
    ]
  },

  toPageNew:function(){
    wx.navigateTo({
      url: '/pages/new/new',
    })
  },

  onLoad: function(options) {
    const _this = this;
    let pressureLow = [],
      pressureHigh = [],
      pressureArray = [];
    for (let i = 50; i <= 120; i++) {
      pressureLow.push(`${i}`);
    }
    for (let i = 70; i <= 160; i++) {
      pressureHigh.push(`${i}`);
    }
    pressureArray.push(pressureLow);
    pressureArray.push(pressureHigh);
    _this.setData({
      pressureArray: pressureArray
    })
  },
  //确定时触发该事件
  bindMultiPickerChange(e) {
    this.setData({
      pressureIndex: e.detail.value
    })
  },
  //滑动列时触发该事件
  bindMultiPickerColumnChange(e) {
  let currentColunm = e.detail.column; 
  let currentClounmIndex = e.detail.value; 
  let pressureArray = this.data.pressureArray
  console.log('修改的列为', currentColunm, '，值为', currentClounmIndex);
  let data = {
    pressureArray: this.data.pressureArray, 
    pressureIndex: this.data.pressureIndex 
  }
  data.pressureIndex[currentColunm] = currentClounmIndex
  data.pressureIndex[1] = currentClounmIndex;
  this.setData(data)
},
})
