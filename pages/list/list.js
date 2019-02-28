// pages/list/list.js
//引入
const fetch=require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    shops:[],
    category:{},
    pageIndex:0,
    limit:20,
    hasMore:true
  },
  //定义一个函数加载页面数据
  loadmore () {
    //首先判断是否还有数据,用到hasMore
    if(!this.data.hasMore) return;
    //首先进入页面加载20条数据,设置默认数据
    //每次加载的数据不一样,所以参数_page需要++,利用解构赋值进行
    let { pageIndex, limit } = this.data;
    const params = { _page: ++pageIndex,_limit:limit}
    //然后发请求,需要有参数,查询的页数,以及每页的条数
    // console.log(this.data.id)
    return fetch(`categories/${this.data.id}/shops`,params).then(res=>{
      console.log(res)
      //获取所有数据条数
      const total = res.header["X-Total-Count"]
      // console.log(total)
      const hasMore = params._page * params._limit < total
      // console.log(hasMore)
      //将shops数据相加
      const shops=this.data.shops.concat(res.data)
      this.setData({ shops, pageIndex,hasMore})
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取index页面跳转过来的id
    const id=options.cat;
    // console.log(id)
    //设置
    this.setData({id:id})
    //调用加载数据函数
    this.loadmore()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log(this.data.id)
    //获取data里面的id,发请求
    fetch(`categories/${this.data.id }`).then(res=>{
      // console.log(res)
      this.setData({ category:res.data});
      wx.setNavigationBarTitle({title:res.data.name})
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
    //下拉刷新时要将之前上拉加载时的数据恢复为默认值
    this.setData({ shops: [], pageIndex: 0, hasMore:true});
    this.loadmore().then(()=>{
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadmore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})