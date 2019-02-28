//index.js
//获取应用实例
const app = getApp()
//引入封装的请求
const fetch=require('../../utils/util.js');

Page({
  data: {
    slides:[],
    categories:[]
  },
  onLoad: function () {
    //slides
    fetch('slides',{}).then(res=>{
      // console.log(res);
      this.setData({
        slides:res.data
      });
    }),
    //grids
    fetch('categories',{}).then(res=>{
      // console.log(res);
      this.setData({
        categories:res.data
      })
    })
    
  }
})
