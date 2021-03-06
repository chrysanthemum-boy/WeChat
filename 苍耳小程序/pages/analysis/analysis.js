const app = getApp();
Page({
data: {
  progress_txt: '正在分析中...',  
  count:0, // 设置 计数器 初始为0
  countTimer: null // 设置 定时器 初始为null
},
countInterval: function () {
  // 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
  this.countTimer = setInterval(() => {
    if (this.data.count <= 60) {
      /* 绘制彩色圆环进度条  
      注意此处 传参 step 取值范围是0到2，
      所以 计数器 最大值 60 对应 2 做处理，计数器count=60的时候step=2
      */
       this.drawCircle(this.data.count / (60/2))
      this.data.count++;
    } else {
      this.setData({
        progress_txt: "分析完成"
      }); 
      clearInterval(this.countTimer);
    }
  }, 100)
},
onReady: function () {
  this.drawProgressbg();
  // this.drawCircle(2) 
  this.countInterval()
},
drawProgressbg: function(){
  // 使用 wx.createContext 获取绘图上下文 context
  var ctx = wx.createCanvasContext('canvasProgressbg',this)
  ctx.setLineWidth(4);// 设置圆环的宽度
  ctx.setStrokeStyle('#20183b'); // 设置圆环的颜色
  ctx.setLineCap('round') // 设置圆环端点的形状
  ctx.beginPath();//开始一个新的路径
  ctx.arc(110, 110, 100, 0, 2 * Math.PI, false);
  //设置一个原点(110,110)，半径为100的圆的路径到当前路径
  ctx.stroke();//对当前路径进行描边
  ctx.draw();
},
// onReady: function () {
//   this.drawProgressbg(); 
// },
drawCircle: function (step){  
  var context = wx.createCanvasContext('canvasProgress',this);
    // 设置渐变
    var gradient = context.createLinearGradient(200, 100, 100, 200);
    gradient.addColorStop("0", "#2661DD");
    gradient.addColorStop("0.5", "#40ED94");
    gradient.addColorStop("1.0", "#5956CC");
    
    context.setLineWidth(10);
    context.setStrokeStyle(gradient);
    context.setLineCap('round')
    context.beginPath(); 
    // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    context.arc(110, 110, 100, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
    context.stroke(); 
    context.draw() 
},

// onReady: function () {
//    this.drawProgressbg(); 
//    this.drawCircle(2) 
// },
onShow: function () {
  let that = this;// 淡入
  setTimeout(function () {
    app.slideupshow(this, 'slide_up1', 10, 1)
  }.bind(this), 6000);

  // 淡出
  setTimeout(function () {
    app.slideupshow(this, 'slide_do1', 0, 0)
  }.bind(this), 1000);

},
})