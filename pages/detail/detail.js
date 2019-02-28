// pages/detail/detail.js
//引入
const fetch=require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    shop:{}
  },
  //图片画廊
  previewHandle (e) {
    wx.previewImage({
      current: e.target.dataset.src,
      urls: this.data.shop.images
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取id
    const id=options.item;
    console.log(id)
    this.setData({id:id})

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获取id,发请求
    fetch(`shops/${this.data.id}`).then(res=>{
      console.log(res)
      this.setData({shop:res.data})
      wx.setNavigationBarTitle({ title: res.data.name })
    })
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