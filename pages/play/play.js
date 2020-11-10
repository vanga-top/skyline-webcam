

const app = getApp();

Page({
  data : {
    playURL : null,
    startPlay : false,
    playerActive : false,
    title : 'QN LIVE Player',
  },

  onLoad(option) {
    wx.showShareMenu({
      withShareTicket: true
    });
  },

  onShow(){
    this.setData({startPlay:false});
    if (app.globalData.userInfo) {
      this.onLoginFinish();
    }
    wx.setKeepScreenOn({
      keepScreenOn: true
    });
  },

  onHide() {
    wx.setKeepScreenOn({
      keepScreenOn: false,
    });
  },

  onLoginFinish(){
      const user = app.globalData.userInfo
      if (!this.playContext) {
        this.playContext = wx.createLivePlayerContext('player',this);
      }
      this.getPlayURL(user)
  },

  getPlayURL: function(userInfo) {
      const self = this;
      var url  = 'rtmp://pili-live-rtmp.vanga.top/vanga-test01/sdkvanga_ls1604365190496857000';
      self.setData({playURL:url},()=>{
        console.log("set url success...url:"+url);
        self.playContext.play({
          success:function(){
            console.log('play success');
          },
          fail:function(){
            console.log('play fail');
          },
          complete: function(){
            console.log('complete');
          }
        });
        self.playContext.requestFullScreen({ direction: 0 });
      });
      
      // wx.request({
      //   url: 'https://vanga.top/qn/api/rtml/play?token=123456',
      //   dataType:'json',
      //   success:function(data) {

      //   }
      // })
  },
  onPageExit() {
    wx.navigateBack();
  },

  onPlayerTap() {
      console.log("onPlayerTap......")
  },

  error(event){
    console.log(event)
  },
});