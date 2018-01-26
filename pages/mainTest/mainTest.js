//获取题目实例
var api = require('../../utils/ajax.js')
const app = getApp()

Page({
  data: {
    jsonPage:1,
    questionId:null,
    val:null,
    testitems:{

    },
    arr:[
      "A","B","C","D"
    ],
    jsonData:{
    }
  },
 
  //------------------事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that=this;
    api.getData('/rs/question?order=asc',"GET").then((res)=>{
            wx.hideLoading()
            that.setData({
              testitems:res.data.rows
            })
            console.log(that.data.testitems)
      })
  },
  
  checkboxChange: function (e) {
    this.setData({ val: e.detail.value, questionId: e.target.dataset.id })
    console.log("题号：" + this.data.questionId + "---选项：" + this.data.val)
    app.globalData.answerList[this.data.questionId] = this.data.val;

  },
  clickbtn: function () {
    // console.log(app.globalData.answerList)
    var answer_len = Object.keys(app.globalData.answerList).length;
    console.log("answer_len"+answer_len)
    if (answer_len>93){
      wx.showModal({
          title: '提示',
          content: '请您将所有题目填完再提交！',
          success: function(res) {
            if (res.confirm) {
              // console.log('用户点击确定')
            } else if (res.cancel) {
              // console.log('用户点击取消')
            }
          }
        })
    }else{
      wx.redirectTo({
       url: "../testRes/testRes"
    })
    }
   
    
  },
  //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1000);
  }
})
