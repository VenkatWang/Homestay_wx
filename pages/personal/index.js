// pages/personal/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    loginBtn: false,
  },
  toLogin() {
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },
  toOrder() {
    wx.switchTab({
      url: "/pages/order/index"
    })
  },
  toEditInformation() {
    wx.navigateTo({
      url: '/pages/editinformation/index',
    })
  },
  handleExit() {
    wx.clearStorageSync();
    this.setData({
      loginBtn: false
    })
    this.setData({
      user: {
        uid: "",
        uage: "",
        usex: "",
        uphone: "",
        create_time: "",
        update_time: ""
      }
    })
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
    if (wx.getStorageSync('token')) {
      this.setData({
        loginBtn: true
      })
      if (wx.getStorageSync('user')) {
        this.setData({
          user: wx.getStorageSync('user')
        })
        this.setData({
          user: {
            ...this.data.user,
            avatar: app.globalData.IMGURL + this.data.user.avatar
          }
        })
        if (!this.data.user.uage) {
          this.setData({
            user: {
              ...this.data.user,
              uage: "尚未设置"
            }
          })
        }
        if (this.data.user.usex === 0) {
          this.setData({
            user: {
              ...this.data.user,
              usex: "尚未设置"
            }
          })
        } else if (this.data.user === 1) {
          this.setData({
            user: {
              ...this.data.user,
              usex: "男"
            }
          })
        } else if (this.data.user === 2) {
          this.setData({
            user: {
              ...this.data.user,
              usex: "女"
            }
          })
        }
      } else {
        this.setData({
          user: {
            uid: "",
            uage: "",
            usex: "",
            uphone: "",
            create_time: "",
            update_time: ""
          }
        })
      }
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