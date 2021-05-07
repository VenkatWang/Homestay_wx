import {
  request
} from "../../request/index.js"
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {
      uid: "1",
      uname: "",
      uage: "",
      usex: "",
      uphone: "",
      create_time: "",
      update_time: "",
      avatar: ""
    },
    fileList: []
  },
  handleChange(e) {
    let name = e.currentTarget.dataset.name;
    let value = e.detail;
    this.setData({
      user: {
        ...this.data.user,
        [name]: value
      }
    })
  },
  afterRead(event) {
    const {
      file
    } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    console.log(file);
    let _this = this;
    wx.uploadFile({
      url: 'http://homestay/homestay-admin/public/index.php/admin/upload/index', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: {
        user:this.user
      },
      success(res) {
        // 上传完成需要更新 fileList
        let data = JSON.parse(res.data)
        const {
          fileList = []
        } = _this.data;
        fileList.push({
          ...file,
          url: data.imgURL
        });
        _this.setData({
          fileList
        });
        _this.setData({
          user: {
            ..._this.data.user,
            avatar: _this.data.fileList[0].url
          }
        })
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let uid = wx.getStorageSync("user").uid;
    let token = wx.getStorageSync('token');
    request({
      url: 'http://homestay/homestay-admin/public/index.php/user/user/' + uid,
      header: {
        token,
        "Retry-after": 3600
      },
      method: "GET",
      timeout: 5000,
    }).then(res => {
      if (res.statusCode === 200 && res.data.code === 200) {
        Notify({
          type: "success",
          message: res.data.msg
        })
        switch (res.data.data.usex) {
          case 0:
            res.data.data.usex = ""
            break;
          case 1:
            res.data.data.usex = "男"
            break;
          case 2:
            res.data.data.usex = "女"
            break;
          default:
            break;
        }
        this.setData({
          user: res.data.data
        });
        // let fileList = [];
        // fileList.push("http://homestay" + res.data.data.avatar);
        // this.setData({
        //   fileList
        // })

      } else {
        Notify({
          type: "danger",
          message: res.data.msg
        })
      }
    }).catch((error) => {
      Notify({
        type: "danger",
        message: error
      })
    })
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