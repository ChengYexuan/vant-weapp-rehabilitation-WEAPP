// custom-tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    // 被选中的tab的index
    selected: 0,
    color: "#999999",
    // 选中时的字体颜色
    selectedColor: "#7ED5E5",
    list: [
      {
        pagePath: "/pages/index/index",
        text: "首页",
        icon: "home-o"
      },
      {
        pagePath: "/pages/train/train",
        text: "我的方案",
        icon: "points"
      },
      {
        pagePath: "/pages/new/new",
        text: "新建方案",
        icon: "add-o"
      },
      {
        pagePath: "/pages/me/me",
        text: "我的",
        icon: "user-o"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      // 此处的e.currentTarget.dataset.path与data.list.pagePath相同
      const data = e.currentTarget.dataset
      const url = data.path
      // 必须是配置在app.json的tabbar项中才可以使用switchTab方法
      wx.switchTab({url})
      console.log(data.index)
      this.setData({
        selected: data.index
      })
    }
  }
})
