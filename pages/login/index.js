import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
import {
  request
} from "../../request/index.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isActive: true,
    loginForm: {},
    signinForm: {},
    uphone: "",
    upassword: "",
    upasswordAgain: "",
    path: ""
  },
  toLogin() {
    if (!this.data.isActive) {
      this.setData({
        isActive: true,
        uphone: "",
        upassword: "",
        upasswordAgain: ""
      })
    }
  },
  toSignIn() {
    if (this.data.isActive) {
      this.setData({
        isActive: false,
        uphone: "",
        upassword: "",
      })
    }
  },
  handleLogin() {
    if (this.data.uphone &&
      this.data.upassword) {
      // 内容都填之后进行下一步的操作
      request({
        url: "http://homestay/homestay-admin/public/index.php/user/login",
        method: "POST",
        data: {
          uphone: this.data.uphone,
          upassword: this.data.upassword,
        }
      }).then(res => {
        if (res.statusCode === 200 && res.data.code === 200) {
          Notify({
            type: 'success',
            message: res.data.msg
          });
          wx.setStorageSync('token', res.data.token);
          wx.setStorageSync('user', res.data.data);
          if (this.data.path == "/pages/order/index" || this.data.path == "/pages/personal/index") {
            wx.switchTab({
              url: this.data.path,
            })
          } else {
            wx.redirectTo({
              url: this.data.path,
            })
          }
        } else {
          Notify({
            type: 'warning',
            message: res.data.msg
          });
        }
      }).catch(() => {
        Notify({
          type: 'warning',
          message: res.data.msg
        });
      })

    } else {
      if (!this.data.uphone) {
        Notify({
          type: 'danger',
          message: '手机号码不能为空'
        });
        return;
      } else if (this.data.uphone.length < 11) {
        Notify({
          type: 'danger',
          message: '请输入合法的手机号码'
        });
        return;
      }
      if (!this.data.upassword) {
        Notify({
          type: 'danger',
          message: '密码不能为空'
        });
        return;
      } else if (this.data.upassword.length < 6 || this.data.upassword.length > 10) {
        Notify({
          type: 'danger',
          message: '请输入6-10位的密码'
        });
        return;
      }
    }
  },
  handleSignIn() {
    if (this.data.uphone &&
      this.data.upassword &&
      this.data.upasswordAgain &&
      this.data.upassword === this.data.upasswordAgain) {
      // 内容都填之后进行下一步的操作
      request({
        url: "http://homestay/homestay-admin/public/index.php/user/user",
        method: "POST",
        data: {
          uphone: this.data.uphone,
          upassword: this.data.upassword,
        }
      }).then(res => {
        if (res.statusCode === 200 && res.data.code === 200) {
          Notify({
            type: 'success',
            message: res.data.msg + ",请登录"
          });
          this.toLogin();
        } else {
          Notify({
            type: 'warning',
            message: res.data.msg
          });
        }
      }).catch(() => {
        Notify({
          type: 'warning',
          message: res.data.msg
        });
      })

    } else {
      if (!this.data.uphone) {
        Notify({
          type: 'danger',
          message: '手机号码不能为空'
        });
        return;
      } else if (this.data.uphone.length < 11) {
        Notify({
          type: 'danger',
          message: '请输入合法的手机号码'
        });
        return;
      }
      if (!this.data.upassword) {
        Notify({
          type: 'danger',
          message: '密码不能为空'
        });
        return;
      } else if (this.data.upassword.length < 6 || this.data.upassword.length > 10) {
        Notify({
          type: 'danger',
          message: '请输入6-10位的密码'
        });
        return;
      }
      if (!this.data.upasswordAgain) {
        Notify({
          type: 'danger',
          message: '请再次输入密码'
        });
        return;
      } else if (this.data.upassword !== this.data.upasswordAgain) {
        Notify({
          type: 'danger',
          message: '两次输入的密码不一致'
        });
        return;
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('path')) {
      this.data.path = wx.getStorageSync('path');
    } else {
      this.data.path = "/pages/personal/index"
    }
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