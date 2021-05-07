// pages/main/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    show: false,
    option1: [{
      text: '按发布时间',
      value: 0
    }],
    option2: [{
        text: '默认',
        value: 0
      },
      {
        text: '升序',
        value: 1
      },
      {
        text: '降序',
        value: 2
      },
    ],
    option3: [{
        text: '全部',
        value: 0
      },
      {
        text: '可以预定',
        value: 1
      },
      {
        text: '不可预定',
        value: 2
      },
    ],
    value1: 0,
    value2: 0,
    value3: 0,
    list:[1,2,3,4,5,6,7,8,9]
  },

  onDisplay() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(event) {
    this.setData({
      show: false,
      date: this.formatDate(event.detail),
    });
  },

  /*]]]]]]]]]]]]]]]]]]]]]]]]]]]*
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