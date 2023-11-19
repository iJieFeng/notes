# 合成分享图片，保存分享

painter插件

1、下载painter插件 

2、页面引用painter插件

3、传入需要绘制的数据（palette）

4、绘制成功后调用imgOK方法得到图片临时地址

5、调用onShareAppMessage用于分享好友，调用wx.saveImageToPhotosAlbum用于保存到本地（wx.getSetting，wx.authorize检测是否开启权限）

index.json

```json
{
  "usingComponents": {
    "painter": "/components/painter/painter"
  }
}
```

index.html

```html
<button hover-class="active" hover-stay-time="70" catchtap="checkPhotosAlbumAuth">保存到相册</button>
<painter palette="{{posterData}}" widthPixels="750" bind:imgOK="posterComplete" bind:imgErr="posterErr" style="position:fixed; top:-9999rpx" />
```

index.js

```js
import sharePoster from "./poster";
Page({
    data: {
        posterData: null,
    },
    onLoad(): {
        this.getShareImage()
    },
    /** promise封装 */
    wx2Promisify (fn){
  		return (obj = {}) => {
    		return new Promise((resolve, reject) => {
                obj.success = (res) => {
        			resolve(res);
      			}
                obj.fail = (res) => {
                    reject(res);
                }
                fn(obj)
            })
        }
    }
    /** 获取分享图片 */
  	getShareImage() {
     	// 绘制的数据
    	const posterData = {
      		shareBackground: 'url',
      		shareName: 'string',
    	};
    	this.setData({
      		posterData: new sharePoster(posterData).palette(),
    	});
  	},
  	posterComplete(e) {
    	this.setData({
      		shareImageUrl: e.detail.path,
    	});
  	},
  	posterErr(e) {
    	console.log(e);
  	},
    /** 分享给好友 */
    async onShareAppMessage() {
    	return {
      		path: '',
      		imageUrl: this.data.shareImageUrl, 
      		title: '',
    	};
  	},
    /** 保存到相册 */
    checkPhotosAlbumAuth() {
        const res = await wx2Promisify(wx.getSetting)()
        if (!res.authSetting['scope.writePhotosAlbum']) {
            const [err, _subRes] = await errorCaptured(wx2Promisify(wx.authorize)({
          	scope: 'scope.writePhotosAlbum',
        }))
        if (err) {
          await errorCaptured(Dialog.confirm({
            context: this,
            title: '提示',
            message: '您尚未开启保存图片到相册的权限，请点击确定开启权限！',
            confirmButtonOpenType: 'openSetting'
          }))
          return
        }
        if (_subRes.errMsg === "authorize:ok") {
          this.savePoster()
        }
      } else {
        this.savePoster()
      }
    },
    async savePoster() {
      showLoading('')
      const res = await wxp(wx.saveImageToPhotosAlbum)({
        filePath: this.data.shareImageUrl,
      })
      if (res.errMsg === 'saveImageToPhotosAlbum:ok') {
        showToast('保存成功', { icon: 'success' })
      }
    },
})

```

poster.js

```js
const shareImage = (obj) => {
  return {
    width: "750rpx",
    height: "600rpx",
    borderRadius: '0',
    background: "#fff",
    views: [
      {
        id: 'shareBackground',
        type: "image",
        url: `${obj.shareBackground}`,
        css: {
          width: '750rpx',
          height: '600rpx',
          top: 0,
          left: 0,
        }
      },
      {
        id: 'shareName',
        type: "text",
        text: `${obj.shareName}热销榜`,
        css: {
          width: '750rpx',
          top: '284rpx',
          textAlign: 'center',
          fontSize: '78rpx',
          fontWeight: 'bold',
          lineHeight: '74rpx',
          color: '#fff'
        }
      }
    ]
  }
}

export default class sharePoster {
  constructor(obj) {
    this.obj = obj
  }
  palette() {
    return shareImage(this.obj)
  }
}
```



# 隐藏滚动条

```css
::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    color: transparent;
}
```



# iphone手机1rpx边框显示不全

```css
/* 解决iphoe某些机型边框显示不全 */
transform: rotateZ(360deg);
```



# wx.downloadFile()预览保存文件

```js
handleDownloadFile(e) {
    const item = e.currentTarget.dataset.item;
    const fileType = item.ossUrl.substring(item.ossUrl.lastIndexOf(".") + 1);
    const fileList = ["doc", "docx", "xls", "xlsx", "ppt", "pptx", "pdf"];
    const imgList = ["png", "jpg", "xls", "jpeg", "gif"];
    if (fileList.indexOf(fileType) !== -1) {
        wx.downloadFile({
            url: item.ossUrl,
            success: function (res) {
                if (res.statusCode === 200) {
                    // 通过内置文档对象打开文档，便于另存为
                    wx.openDocument({
                        filePath: res.tempFilePath,
                        fileType: fileType,
                        showMenu: true, // 关键，这里开启预览页面的右上角菜单，才能另存为
                    });
                }
            },
        });
        return;
    }
    if (imgList.indexOf(fileType) !== -1) {
        wx.previewImage({
            current: item.ossUrl,
            urls: [item.ossUrl],
        });
    }
},
```



# 设置scroll-view高度，占据页面剩余空间

```js
onScrollViewHeight(e) {
    // 计算导航栏高度
    const {
        system,
        screenWidth: w,
        screenHeight: h,
        statusBarHeight,
    } = wx.getSystemInfoSync();
    const navBarHeight = system.indexOf("iOS") !== -1 ? 44 : 48;
    const _height = h - navBarHeight - statusBarHeight
    //cosnt _rpxHeight = h * 750 / w - 其他组件高度rpx
    // 计算页面其他元素高度
    const query = wx.createSelectorQuery()
    // 组件内
    // const query = wx.createSelectorQuery().in(this)
    query.select('.tab').boundingClientRect()
    query.exec(function(res){
        that.setData({
            scrollViewHeight: _height - res[0].height
        })
    })
},
```



# scroll-view选中项自动居中

```vue
<scroll-view 
    id="tabScroll" 
    scroll-x 
    scroll-left="{{scrollLeft}}" 
    scroll-with-animation enable-flex 
    style="width:100%"
>
    <view class="tabs">
        <block wx:for="{{tabList}}" wx:key="id">
            <view 
                  class="tabs-item {{activeTab===index?'tab-item_active':''}}"
                  bindtap="handletabTap" 
                  data-index="{{index}}" 
                  data-item="{{item}}"
             >
                {{item.tabTitle}}
            </view>
        </block>
    </view>
</scroll-view>
```



```js
handletabTap(e) {
    const index = e.currentTarget.dataset.index;
    const offsetLeft = e.currentTarget.offsetLeft;
    const tabScrollWidth = this.data.tabScrollWidth / 2;
    this.setData({
        activeTab: index,
        scrollLeft: offsetLeft - tabScrollWidth,
    });
},
```



# 导航栏滚动到顶部时候吸顶

1、获取导航栏距离顶部的距离（tabsTop）

2、获取滚动条的距离（scrollTop）

3、监听滚动条的距离，当scrollTop>tabsTop，添加fixed属性

```html
<view class="tabs-card {{isFixed?'tabs-card_fixed':''}}" style="top:{{fixedTop}}px;"></view>
```

```css
.tabs-card_fixed {
	position: fixed;
	left: 0;
	z-index: 100;
}
```

```js
data: {
    isFixed: false, // 是否吸顶
    fixedTop: 0, // 吸顶距离
},
onReady {
    this.getTabsExec()
},
/** 监听滚动条 */
onPageScroll(e) {
    let tabsTop = this.data.tabsTop // 导航栏距离顶部的距离
    let scrollTop = e.scrollTop // 滚动条距离顶部的距离
    this.setData({
      	isFixed: e.scrollTop > tabsTop ? true : false
    })
},
/** 获取导航栏距离顶部的距离 */
getTabsExec() {
	const _this = this
	const query = wx.createSelectorQuery()
	query.select('.tabs-card').boundingClientRect()
	query.selectViewport().scrollOffset()
	query.exec(function (res) {
		_this.setData({
			tabsTop: res[0].top
		})
	})
},

```



# 导航栏切换页面，返回时停留在当前浏览位置

方案一：swiper+scroll-view ,适用于导航栏在顶部固定的情形

```html
<!-- 导航栏 -->
<view class="tabs-card">
  <scroll-view id="tabScroll" scroll-x scroll-left="{{scrollLeft}}" scroll-with-animation enable-flex style="width:100%">
    <view class="tab-list">
      <block wx:for="{{tabList}}" wx:key="id">
        <view class="tab-item {{activeTab===index?'tab-item_active':''}}" bindtap="tabClick" data-index="{{index}}" data-item="{{item}}">
          {{item.name}}
        </view>
      </block>
    </view>
  </scroll-view>
</view>

<!-- 列表 -->
<view class="goods-list">
    <swiper current="{{activeTab}}" duration="{{300}}" bindanimationfinish="animationFinish" style="min-height: 100vh;">
      <swiper-item wx:for="{{tabList}}">
        <scroll-view scroll-y="true" style="height: 100vh;">
          <block wx:if="{{index===0}}">
            <!-- 业务代码 -->
          </block>
          <block wx:if="{{index===1}}">
            <!-- 业务代码 -->
          </block>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>

```

```js
tabClick(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      activeTab: index
    });
  },
animationFinish(e){
    this.setData({
      activeTab: e.detail.current
    });
  }
```



方案二：保存每一个导航栏对应滚动的距离



