const app = getApp(); // 获取全局变量

Page({
  data: {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
// 淡入
    setTimeout(function () {
      app.sliderightshow(this, 'slide_up1',1, 200)
    }.bind(this), 300);

    // 淡出
    setTimeout(function () {
      app.sliderightshow(this, 'slide_do1', 0, 0)
    }.bind(this), 1000);

  },
})