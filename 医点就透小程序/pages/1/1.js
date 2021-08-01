
const app = getApp()

Page({
  data: {
   result2:false,
   animation:true,
   slide_do1:false,
  },
  onLoad:function(){
    var that=this;
    let SCREEN_WIDTH = 750;
    let RATE = wx.getSystemInfoSync().screenHeight /wx.getSystemInfoSync().screenWidth;
    that.setData({                
      ScreenTotalW: SCREEN_WIDTH,  
      ScreenTotalH: SCREEN_WIDTH * RATE,     				
    })        
  },
  
    //文字识别 获取token
    getBaiduToken: function(){
      var apiKey = '******';    
      var secKey = '******';    
      var tokenUrl = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${apiKey}&client_secret=${secKey}`;    
      var that = this;    
      wx.request({        
        url: tokenUrl,        
        method: 'POST',        
        dataType: 'json',        
        header:{            
          'content-type': 'application/json; charset-UTF-8'        
        },        
        success: function(res){            
          console.log("[BaiduToken获取成功]",res);            
          that.setData({                
            baiduToken: res.data.access_token            				
          })        
        },        
        fail: function(res){            
          console.log("[BaiduToken获取失败]",res);
        }    
      })  
    },
  
  
    //上传打印图片
   
    scanImageInfo: function(imageData){       //orc接口调用
      var that = this;
      const detectUrl = `https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic?access_token=${that.data.baiduToken}`    // baiduToken是已经获取的access_Token
        return new Promise(function(resolve,reject){        
        wx.request({            
          url: detectUrl,            
          data: {                
            image: imageData            
          },            
          method: 'POST',            
          dataType: 'json',            
          header:{                
            'content-type': 'application/x-www-form-urlencoded'          
          },            
          success:(res)=>{ 
            that.setData({
              animation:false,
              result2:true,
              words2: res.data.words_result
            })                          
            console.log('get word success：',res.data);
            var aidata = res.data.words_result 
            console.log(aidata)    
          },            
          fail :(res,reject)=>{              
            console.log('get word fail：',res.data);           			
          },            
        })
      }) 
    },
    doUpload: function () {
      var that = this    
      that.getBaiduToken()    // 提前获取access_Token
                              // 选择图片，拍照或从相册中获取
      wx.chooseImage({      
        count: 1,      
        sizeType: ['compressed'],      
        sourceType: ['album', 'camera'],      
        success:  (res) =>{
        	wx.showLoading({          
          	title: '上传中',        
        	})
                const filePath = res.tempFilePaths[0]       // 上传图片           
                this.setData({
                  images:filePath
                })      
                wx.getFileSystemManager().readFile({          
                  filePath: filePath,          
                  encoding: 'base64',          
                  success :(res)=> {            
                    console.log("[读取图片数据success]");            
                    that.scanImageInfo(res.data); // 调用百度API解析图片获取文字
                  },            
                fail: (res)=>{            
                  console.log("[读取图片数据fail]",res)          
                },            
              complete: function(res){            
                wx.hideLoading()          
                }	
          })
        }    
      })
      //淡入  
      setTimeout(function () {
        app.slideupshow(this, 'slide_up1', 200, 1)
      }.bind(this), 1000);
  
      // 淡出
      setTimeout(function () {
        app.slideupshow(this, 'slide_do1', 0, 0)
      }.bind(this), 2000);
    },

    formSubmit: function (e) {
      var that = this;
      //获取表单所有的值
      var formData = e.detail.value.keyword;
      var num = e.detail.value.num;
      wx.showLoading({
        title: '搜索中',
        icon: 'loading'
      })
      //向搜索后端服务器发起请求
      wx.request({
        //URL
        url: 'http://localhost/粪便检查.php?',
        //发送的数据
        data: {
          keyword : formData,
          num : num,
        },
        //请求的数据时JSON格式
        header: {
          'Content-Type':'application/json'
        },
    
        //请求成功
        success: function (res) {
    
          //控制台打印（开发调试用）
          console.log(res.data)
    
          //把所有结果存进一个名为re的数组
          that.setData({
           
            re: res.data,
          })
        
          //搜索成功后，隐藏搜索中的提示
          wx.hideLoading();
        }
      })
    },
    
  

})
