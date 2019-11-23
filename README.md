## 介绍
   
    本仓库是一个集成了GrowingIO埋点SDK，GTouch安卓SDK以及GTouch_RN_SDK这三种sdk的RN应用。

您可以直接下载到本地打包编译后在您的设备上运行。默认打开app会有一个弹窗，点击可以跳转到原生内部页。以供您体验弹窗SDK在RN框架上的表现。


![](https://tva1.sinaimg.cn/large/006y8mN6ly1g980yr2t2qj30su1hctbx.jpg)

## 正常
- app打开首页弹窗
- 触发事件弹窗
- 点击弹窗跳转app内部页面/h5页面/自定义路由页面 


## 使用
目前只做了安卓系统的demo，ios的会缺少一个原生页面，建议在安卓设备上体验。
```
npm isntall
react-native start
react-native run-android 
```
## 弹窗监听
- 集成时推荐在安卓\iOS原生代码里监听，您可以使用我们定义好的点击弹窗跳转功能
- 如果想在RN代码里监听弹窗的话，参考HomeScreen.js里的写法，推荐写在componentWillMount这个生命周期里。
- 注意一旦在RN里监听了弹窗的话，您就必须自己实现点击弹窗跳转的逻辑，参考HomeScreen.js里的handleEventPopupListener里的onCliked写法。