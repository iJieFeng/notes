# 微信小程序

checkSiteMap：false // 小程序不提示黄色告警

## 数据绑定

- 获取

  ```js
  this.data.keyword
  ```

- 赋值

  ```js
  this.setData({
  	keyword:value
  })
  ```

- 给data中的对象赋值

  ```js
  this.setData({        
      ['对象.属性']:value
  })
  ```

- 给data中的数组赋值

  ```js
  let name = 'list['+index+'].name';
  this.setData({
      [name]:value
  })
  
  this.setData({
      'list[0].title' : 'change data',  
      'list[0].num' : 'change data'
  })
  ```

  

- 拓展：Object.defineProperty数据代理劫持（数据绑定的底层原理）

  ```js
  // Vue数据劫持代理
  
  // 模拟Vue中data选项
  
  let data = {
      username: 'curry',
      age: 33
  }
  
  // 模拟组件的实例
  let _this = {
  
  }
  
  // 利用Object.defineProperty()
  for(let item in data){
      // console.log(item, data[item]);
      Object.defineProperty(_this, item, {
          // get：用来获取扩展属性值的， 当获取该属性值的时候调用get方法
          get(){
              console.log('get()');
              return data[item]
          },
          // set： 监视扩展属性的， 只要已修改就调用
          set(newValue){
              console.log('set()', newValue);
              // _this.username = newValue; 千万不要在set方中修改修改当前扩展属性的值，会出现死循环
              data[item] = newValue;
          }
      })
  }
  
  console.log(_this);
  // 通过Object.defineProperty的get方法添加的扩展属性不能直接对象.属性修改
  _this.username = 'wade';
  console.log(_this.username);
  ```



## 事件绑定 

官方文档：https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html

通过bind关键字来实现。如 bindtap\ bindinput\ bindchange 等

注：catchtab绑定事件可以阻止事件冒泡

```html
<tage-name bindtap="handleTap" data-item="100"></tage-name>
```

```js
Page({
  // 绑定的事件
  handleTap: function(e) {
   console.log(e.currentTarget.dataset)//{item:100}
 }
})
```



## 列表渲染

wx:for="{{arr}}" wx:key="{{唯一值}}" wx:for-item="myItem"

```html
<!-- 默认的个体: item 和 默认的下标: index -->
<view wx:for="{{arr}}" wx:key="{{id}}"></view> 

<!-- 自定义个体变量名称 和 自定义下标变量名称 -->
<view wx:for="{{arr}}" wx:key="{{id}}" wx:for-item="myItem" wx:for-index="myIndex"></view>

```



## 条件渲染

```html
<view wx:if="{{condition}}"> True </view>

<view wx:if="{{length > 5}}"> 1 </view>
<view wx:elif="{{length > 2}}"> 2 </view>
<view wx:else> 3 </view>

<block wx:if="{{true}}">
  <view> view1 </view>
  <view> view2 </view>
</block>
```





## 模板使用

1. 定义模板

```html
<!--
  index: int
  msg: string
  time: string
-->
<template name="msgItem">
  <view>
    <text> {{index}}: {{msg}} </text>
    <text> Time: {{time}} </text>
  </view>
</template>
```

2. 引入模板

   引入模板结构: <import src='模板结构相对路径' />

   引入模板样式: @Import ‘模板样式路径

3. 使用模板

   使用 is 属性，声明需要的使用的模板，然后将模板所需要的 data 传入，如：

   ```html
   <template is="msgItem" data="{{...item}}"/>
   ```

   ```js
   Page({
       data: {
           item: {
               index: 0,
               msg: 'this is a template',
               time: '2016-09-15'
           }
       }
   })
   ```

   is 属性可以使用 Mustache 语法，来动态决定具体需要渲染哪个模板：

   ```html
   <template name="odd">
       <view> odd </view>
   </template>
   <template name="even">
       <view> even </view>
   </template>
   
   <block wx:for="{{[1, 2, 3, 4, 5]}}">
       <template is="{{item % 2 == 0 ? 'even' : 'odd'}}"/>
   </block>
   ```

4. 模板的作用域

   模板拥有自己的作用域，只能使用 data 传入的数据以及模板定义文件中定义的 `<wxs />` 模块。



## 常用组件

1、导航组件：navigator

```html
<!-- 
	target：在哪个⽬标上发⽣跳转，默认当前⼩程序，可选值 self/miniProgram
	url：当前⼩程序内的跳转链接
	open-type：跳转⽅式
	open-type="navigate" 保留当前⻚⾯，跳转到应⽤内的某个⻚⾯，但是不能跳到tabbar ⻚⾯
	open-type="redirect" 关闭当前⻚⾯，跳转到应⽤内的某个⻚⾯，但是不允许跳转到tabbar ⻚⾯。
	open-type="switchTab" 跳转到 tabBar ⻚⾯，并关闭其他所有⾮ tabBar ⻚⾯
	open-type="reLaunch" 关闭所有⻚⾯，打开到应⽤内的某个⻚⾯
	open-type="navigateBack" 关闭当前⻚⾯，返回上⼀⻚⾯或多级⻚⾯。可通过 getCurrentPages() 获取当 前的⻚⾯栈，决定需要返回⼏层
	open-type="exit" 退出⼩程序，target=miniProgram时⽣效
-->
<navigator target="" url="" open-type=""></navigator>
```

2、富文本标签：rich-text

```html
<rich-text nodes="{{nodes}}"></rich-text>
<!-- 加载 字符串  -->
<rich-text nodes='<img src="https://developers.weixin.qq.com/miniprogram/assets/images/head_global_z_@all.png" alt="">'>
</rich-text>
```

3、button  

```html
<!-- 
	open-type 微信开放能力
	
	open-type="contact" 打开客服会话，如果⽤⼾在会话中点击消息卡⽚后返回⼩程序，可以从bindcontact 回调中获得具体信息，
	具体说明https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/customer-message/customer-message.html
	 
	open-type="share" 触发⽤⼾转发，使⽤前建议先阅读使⽤指引
	https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share.html#%E4%BD%BF%E7%94%A8%E6%8C%87%E5%BC%95
	
	open-type="getPhoneNumber" 获取⽤⼾⼿机号，可以从bindgetphonenumber回调中获取到⽤⼾信息， 具体说明
	https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/launchApp.html

	open-type="getUserInfo" 获取⽤⼾信息，可以从bindgetuserinfo回调中获取到⽤⼾信息
	open-type="launchApp" 打开APP，可以通过app-parameter属性设定向APP传的参数具体说明
	open-type="openSetting" 打开授权设置⻚
	open-type="feedback" 打开“意⻅反馈”⻚⾯，⽤⼾可提交反馈内容并上传⽇志，开发者可以登 录⼩程序管理后台后进⼊左侧菜单“客服反馈”⻚⾯获取到反馈内容
-->

<!--
open-type 的 contact的实现流程 
1. 将⼩程序 的 appid 由测试号改为 ⾃⼰的 appid
2. 登录微信⼩程序官⽹，添加 客服客服 -- 微信微信
-->

<button type="default" size="{{defaultSize}}" loading="{{loading}}" plain="{{plain}}" open-type=""></button>
```

## 组件通信

- 父传子：
  1、自定义属性方法：父组件自定义属性，子组件properties接收

  ```html
  <!-- 引用组件的页面 -->
  <component-tag-name props="{{value}}" />
  ```

  ```javascript
  /* 组件的js文件 */
  Component({
  	properties: {
  		props:{
  			type:String/Array/Number/Object/...//数据类型
  			value:"",//默认值
  	}    
  })
  
  ```

  

  2、插槽方法（slot）：子组件定义<slot name="插槽名称"></slot> 父组件<tag-name slot="插槽名称"></tag-name> 

  ```html
  <!-- 引用组件的页面 -->
  <view>
    <component-tag-name>
      <view>这里是插入到组件slot中的内容</view>
    </component-tag-name>
  </view>
  
  <!-- 组件html文件 -->
  <view>
    <view>这里是组件的内部节点</view>
    <slot></slot>
  </view>
  ```

  

  多个插槽的使用

  ```js
  /* 组件的js文件 */
  Component({
    options: {
      multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: { /* ... */ },
    methods: { /* ... */ }
  })
  ```

  ```html
  <!-- 组件html文件 -->
  <view>
    <slot name="before"></slot>
    <view>这里是组件的内部细节</view>
    <slot name="after"></slot>
  </view>
  ```

  ```html
  <!-- 引用组件的页面 -->
  <view>
    <component-tag-name>
      <!-- 这部分内容将被放置在组件 <slot name="before"> 的位置上 -->
      <view slot="before">这里是插入到组件slot name="before"中的内容</view>
      <!-- 这部分内容将被放置在组件 <slot name="after"> 的位置上 -->
      <view slot="after">这里是插入到组件slot name="after"中的内容</view>
    </component-tag-name>
  </view>
  ```

  

- 子传父：
  子组件声明 this.triggerEvent("事件名",{子组件需要传给父组件的参数})

  ```html
  <!-- 在自定义组件html文件中 -->
  <button bindtap="onTap">点击这个按钮将触发“myevent”事件</button>
  ```

  ```js
  // 在自定义组件js文件中
  Component({
    properties: {},
    methods: {
      onTap: function(){
        var myEventDetail = {} // detail对象，提供给事件监听函数
        var myEventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myEventDetail, myEventOption)
      }
    }
  })
  ```

  父组件接收 bind:事件名=回调函数 （组件需要传给父组件的参数存放在e.detail）

  ```html
  <!-- 当自定义组件触发“myevent”事件时，调用“onMyEvent”方法 -->
  <component-tag-name bindmyevent="onMyEvent" />
  <!-- 或者可以写成 -->
  <component-tag-name bind:myevent="onMyEvent" />
  ```

  ```js
  Page({
    onMyEvent: function(e){
      e.detail // 自定义组件触发事件时提供的detail对象
    }
  })
  ```

- 父组件代码

  ```html
  // page.wxml
  
  <tabs tabItems="{{tabs}}" bindmytap="onMyTab" >
  
   内容-这里可以放插槽
  
  </tabs>
  ```

  ```js
  // page.js
  
  data: {
  
    tabs:[
  
    	{name:"体验问题"},
  
    	{name:"商品、商家投诉"}
  
    	]
  
   },
  
    onMyTab(e){
  
     console.log(e.detail);
  
  },
  ```

- 子组件代码

  ```html
  // com.wxml
  
  <view class="tabs">
  
    <view class="tab_title"  >
  
     <block  wx:for="{{tabItems}}" wx:key="{{item}}">
  
      <view bindtap="handleItemActive" data-index="{{index}}">{{item.name}}</view>
  
     </block>
  
    </view>
  
    <view class="tab_content">
  
     <slot></slot>
  
    </view>
  ```

  ```js
  // com.js
  
  Component({
  
    properties: {
  
     tabItems:{
  
      type:Array,
  
      value:[]
    }
   },
    data: {
  
   },
    methods: {
  
     handleItemActive(e){
  
      this.triggerEvent('mytap','haha');
    }
   }
  })
  ```

  

## 本地存储

存：

```js
// wx.setStorage() 异步
// wx.setStorageSync() 同步
wx.setStorage({
    key: "key",
    data: "value"
})
```

取：

```js
// wx.getStorage() 异步
// wx.getStorageSync() 同步
wx.getStorage({
    key: "key",
    success (res) {
        console.log(res.data)
    }
})
```

刪：

```js
// wx.removeStorage() 异步
// wx.removeStorageSync() 同步
wx.removeStorage({
  key: 'key',
  success (res) {
    console.log(res)
  }
})

try {
  wx.removeStorageSync('key')
} catch (e) {
  // Do something when catch error
}
```

清：

```js
// wx.clearStorage() 异步
// wx.clearStorageSync() 同步
wx.clearStorage()

try {
  wx.clearStorageSync()
} catch(e) {
  // Do something when catch error
}
```

注意事项：

1. 除非用户主动删除或因存储空间原因被系统清理，否则数据都一直可用
2. 单个 key 允许存储的最大数据长度为 1MB
3. 所有数据存储上限为 10M

例：如果本地有数据，并且在有效期内，就使用本地数据，否则请求接口

```js
onLoad:function(options){
	//1、获取本地存储的数据
	const LocalData = wx.getStorageSync("localData")
	//2、判断本地是否存在数据
	if(!LocalData){
		//不存在 发送请求获取数据
		this.getData()
	}else{
		//存在 判断是否过期
		if(Date.now() - LocalData.time > 1000 * 10){
			//过期了 发送请求获取数据
			this.getData()
		} else {
			//没过期 使用本地数据
			this.data = LocalData.data
		}
	}
},
getData(){
	request({
		url:""
	}).then(res=>{
		wx.setStorageSync("LocalData", { time: Date.now(), data: res.data });
	})
}
```







## 生命周期

官方文档：https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page-life-cycle.html

1、应⽤⽣命周期 

```js
App({

	onLaunch(){
		//监听⼩程序初始化。
	},
	onShow(){
		//监听⼩程序启动或切前台。
	},
	onHide(){
		//监听⼩程序切后台。
	},
	onError(){
		//错误监听函数。
	},
	onPageNotFound(){
		//⻚⾯不存在监听函数。
	}

})
```

2、页面生命周期

```js
Page({

	data:{
		//⻚⾯的初始数据
	},
  	onLoad: function (options) {
    	//生命周期函数--监听页面加载
  	},
    
    onShow: function () {
		//生命周期函数--监听页面显示
  	},

  	onReady: function () {
		//生命周期函数--监听页面初次渲染完成
  	},

 	onHide: function () {
		//生命周期函数--监听页面隐藏
  	},

  	onUnload: function () {
		//生命周期函数--监听页面卸载
  	},

  	onPullDownRefresh: function () {
        //⻚⾯的json⽂件 window配置中 中开启设置 enablePullDownRefresh:true
		//页面相关事件处理函数--监听用户下拉动作
        this.setData({
			goodsList:[]
  		})
		this.queryParams.pagenum=1;
        this.getGoodsList();
 		}
  	},

  	onReachBottom: function () {
		//页面上拉触底事件的处理函数
        //上滑触底加载下一页
		//判断有没有下一页
		if (this.queryParams.pagenum >= this.totalPages) {
			wx.showToast({ title: '没有下一页数据' });
		} else {
			this.queryParams.pagenum++
            this.getGoodsList()
        }
  	},
    
    // 只有定义了此事件处理函数，右上角菜单才会显示“转发”按钮
    onShareAppMessage: function (res) {
        /** 
        * res.from 转发事件来源。button：页面内转发按钮；menu：右上角转发菜单
        * res.target 如果 from 值是 button，则 target 是触发这次转发事件的 button，否则为 undefined
        * res.webViewUrl 页面中包含web-view组件时，返回当前web-view的url
        */
        if (res.from === 'buttom') {
            // 来自页面内转发按钮
        }
        const promise = new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    title: '自定义转发标题'
                })
            }, 2000)
        })
        // 自定义转发内容
        /** 
        * title 转发标题；默认值当前小程序名称
        * path 转发路径，必须是以 / 开头的完整路径；默认值当前页面path 
        * imageUrl 自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。 
        * promise 如果该参数存在，则以 resolve 结果为准，如果三秒内不 resolve，分享会使用上面传入的默认参数
        */
        return {
            title: '自定义转发标题',
            path: '/page/user?id=123',
            promise 
        }
    }
	
	// 只有定义了此事件处理函数，右上角菜单才会显示“分享到朋友圈”按钮，暂只在 Android 平台支持
	onShareTimeline() {
        /** 
        * title 转发标题；默认值当前小程序名称
        * imageUrl 自定义图片路径，可以是本地文件或者网络图片。支持 PNG 及 JPG，显示图片长宽比是 1:1。默认使用小程序 Logo
        * query 当前页面路径携带的参数
        */
        return {
            title: '自定义转发标题', 
            imageUrl: this.data.shop.shopLogo,
            query: `isShare=true&shopId=${this.data.shopId}&pid=${pid}&uid=${uid}`
        }
    }
})
```

3、组件的生命周期  //详见：https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/lifetimes.html

```js
Component({
	properties: {
		//组件的对外属性，是属性名到属性设置的映射表
	},

	data: {
		//组件的内部数据，和 properties ⼀同⽤于组件的模板渲 染
 	},

    observers:{
        //组件数据字段监听器，⽤于监听 properties 和 data 的变化，参⻅数据监听器
        //详见：https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/observer.html
    },
    
 	methods: {
		//组件的方法列表
	},
    
    created(){
        //组件⽣命周期函数，在组件实例刚刚被创建时执⾏，注意此时不能调⽤ setData,
    },
    
    attached(){
        //组件⽣命周期函数，在组件实例进⼊⻚⾯节点树时执⾏，
    },
    
    ready(){
        //组件⽣命周期函数，在组件布局完成后执⾏
    },
    
    moved(){
        //组件⽣命周期函数，在组件实例被移动到节点树另⼀个位置 时执⾏
    },
    
    detached(){
        //组件⽣命周期函数，在组件实例被从⻚⾯节点树移除时执 ⾏
    }
    
    
})
```



## 路由跳转

官方文档：https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/route.html

官方文档：https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.switchTab.html

1、wx.switchTab ： 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面

```js
wx.switchTab({
  url: '/index'
})
```

2、wx.reLaunch ：关闭所有页面，打开到应用内的某个页面

```js
wx.reLaunch({
  url: 'test?id=1'
})
```

3、wx.redirectTo ： 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面

```js
wx.redirectTo({
  url: 'test?id=1'
})
```

4、wx.navigateTo ：保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 [wx.navigateBack](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateBack.html) 可以返回到原页面。小程序页面栈最多十层

```js
wx.navigateTo({
  url: 'test?id=1',
  events: {
    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
    acceptDataFromOpenedPage: function(data) {
      console.log(data)
    },
    someEvent: function(data) {
      console.log(data)
    }
    ...
  },
  success: function(res) {
    // 通过eventChannel向被打开页面传送数据
    res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
  }
})
//test.js
Page({
  onLoad: function(option){
    console.log(option.query)
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', {data: 'test'});
    eventChannel.emit('someEvent', {data: 'test'});
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log(data)
    })
  }
})
```

5、wx.navigateBack ： 关闭当前页面，返回上一页面或多级页面。可通过 [getCurrentPages](https://developers.weixin.qq.com/miniprogram/dev/reference/api/getCurrentPages.html) 获取当前的页面栈，决定需要返回几层。

```javascript
// 注意：调用 navigateTo 跳转时，调用该方法的页面会被加入堆栈，而 redirectTo 方法则不会。见下方示例代码

// 此处是A页面
wx.navigateTo({
  url: 'B?id=1'
})

// 此处是B页面
wx.navigateTo({
  url: 'C?id=1'
})

// 在C页面内 navigateBack，将返回A页面
wx.navigateBack({
  delta: 2
})
```



## 页面传参

传递

```js
<navigator url="/pages/goods_list/index?id=5"\>
```

接受

```js
onLoad: function (options) {
  console.log(options.id) //5
 },
```



## 事件通道

eventChannel

1. 订阅事件 

   wx.navigateTo()跳转的时候在 events 选项中定义事件名及事件对应的回调

```js
wx.navigateTo({
    url: '',
    events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptData: function(data) {
            console.log(data)
        }
    },
    success: function(res) {
        // 通过事件通道（eventChannel）向被打开页面传送数据
        res.eventChannel.emit('acceptData', {data: "test"})
    }
})
```

2. 获取事件总线对象

   目标页面中通过: 实例.getOpenerEventChannel()

   示例: const eventChannel = this.getOpenerEventChannel()

   

3. 触发事件

   eventChannel.emit(‘事件名’, data)

   ```js
   // 跳转目标页面
   Page({
       onLoad: function() {
           const eventChannel = this.getOpenerEventChannel() // 获取时间总线对象
           eventChannel.emit('acceptData', {data: 'test'}) // 触发自定义事件
           eventChannel.on('acceptData', function(data) {
               console.log(data)
           })
       }
   })
   ```



## 自定义组件

1、创建⾃定义组件：一个自定义组件由 json  wxml  wxss js4个文件组成

2、声明组件：在组件的 json ⽂件中设置  "component": true

```js
{
    "component": true,
	"usingComponents": {}
}
```

3、在页面的json文件中引⼊⾃定义组件 

```js
{
    "usingComponents": {
        // 要使用的组件的名称   // 组件的路径
        "my-header":"/components/myHeader/myHeader"
    }
}
```

4、在页面的html文件中使用自定义组件

```html
<view>
  <!-- 以下是对一个自定义组件的引用 -->
  <my-header inner-text="Some text"></my-header>
</view>
```









## 框架接口

<font color='red'>App</font>

1. 全局 app.js 中执行 App()

2. 生成当前应用的实例对象

3. getApp()获取全局应用实例

   

<font color='red'>Page</font>

1. 页面.js 中执行 Page()
2. 生成当前页面的实例
3. 通过 getCurrentPages 获取页面实例

```js
/** 
* getCurrentPages() 用于获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面。
* 不要尝试修改页面栈，会导致路由以及页面状态错误。
* 不要在 App.onLaunch 的时候调用 getCurrentPages()，此时page 还没有生成
*/

/** 获取当前页面相关信息 */ 
let pages = getCurrentPages(); 
let prevPage = pages[pages.length - 1];
// 或
let prevPage = pages.pop(); // pop() 方法用于删除并返回数组的最后一个元素
console.log( prevPage.route); // 举例：输出为‘pages/index/index’

/** 利用页面栈的长度 （进入小程序非默认首页时，需要提供返回首页的按钮或者执行其它事件） */ 
onShow() {
    let pages = getCurrentPages(); //当前页面栈
    if (pages.length == 1) {
        //todo
    }
},
    
/** 跨页面赋值 */ 
let pages = getCurrentPages();//当前页面栈`
let prevPage = pages[pages.length - 2];//上一页面`
prevPage.setData({
	//直接给上移页面赋值`
});

/** 页面跳转后自动刷新 */ 
wx.switchTab({
	url: '../index/index',
	success: function (e) {
		var page = getCurrentPages().pop(); //当前页面
		if (page == undefined || page == null) return;
		page.onLoad(); //或者其它操作`
	}
})
```



## wx API 

<font color='red'>wx.createSelectorQueryt()</font> 

获取元素实例 https://developers.weixin.qq.com/miniprogram/dev/api/wxml/wx.createSelectorQuery.html

注：在自定义组件或包含自定义组件的页面中，应使用 `this.createSelectorQuery()` 来代替

```js
const query = wx.createSelectorQuery()
query.select('#the-id').boundingClientRect()
query.selectViewport().scrollOffset()
query.exec(function(res){
  res[0].top       // #the-id节点的上边界坐标
  res[1].scrollTop // 显示区域的竖直滚动位置
})
```



<font color='red'>wx.previewImage()</font> 

图片预览，在新页面中全屏预览图片。预览的过程中用户可以进行保存图片、发送给朋友等操作

```js
wx.previewImage({
  current: '', // 当前显示图片的http链接,,默认是urls的第一张
  urls: [] // 需要预览的图片http链接列表
})
```



<font color='red'>wx.chooseAddress()</font> 

获取用户收货地址。调起用户编辑收货地址原生界面，并在编辑完成后返回用户选择的地址。

```js
wx.chooseAddress({
  success (res) {
    console.log(res)
  }
})
```



<font color='red'>wx.setNavigationBarTitle </font> 

设置导航栏标题

```js
wx.setNavigationBarTitle({
  title: '导航栏标题'
})
```



<font color='red'>wx.pageScrollTo </font> 

控制页面滚动条滑动距离

```js
wx.pageScrollTo({
   duration: 300,
   scrollTop: 0 // 滚动距离
}) 
```



<font color='red'>wx.requestSubscribeMessage</font>

 微信订阅消息

注意：wx.requestSubscribeMessage的tmplIds最多放3个模板id



## 登录

### 小程序获取用户基本信息

1. 首次登陆获取 https://developers.weixin.qq.com/miniprogram/dev/component/button.html

   Button 组件设置 open-type 属性为 getUserInfo<button open-type='getUserInfo'></button>

   设置后首次登陆点击 button 可以弹出授权窗口

   授权的动作只发生一次，除非清除缓存，点击 butotn 授权一次之后再点击失效，不会弹出授权窗口

2. 授权之后获取 https://developers.weixin.qq.com/miniprogram/dev/api/open-api/user-info/wx.getUserInfo.html

   wx.getUserInfo()

### 小程序获取用户唯一标识 （openId）

1. wx.login()

2. 发送 code 给服务器端

3. 服务器端发送请求携带参数(code, appSecret, appId)给微信服务器获取 openId

   - appSecret，appId 在微信公众平台获取

4. 服务器获取 openId 后进行加密返回给前端

   ```js
   wx.login({
       success (res) {
           if (res.code) { // code为临时凭证
               //发起网络请求
               wx.request({
                   url: 'https://example.com/onLogin',
                   data: {
                       code: res.code
                   }
               })
           } else {
               console.log('登录失败！' + res.errMsg)
           }
       }
   })
   ```

![image-20220426175707959](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220426175707959.png)



## 支付

官网地址：https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_3&index=1

![image-20220426174437121](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220426174437121.png)

支付流程详细说明

1. 用户在小程序客服端下单(包含用户及商品信息)
2. 小程序客户端发送下单支付请求给商家服务器
3. 商家服务器同微信服务器对接获取唯一标识 openID
4. 商家服务器根据 openId 生成商户订单(包含商户信息)
5. 商家服务器发送请求调用统一下单 API 获取预支付订单信息，
   - 接口地址: https://api.mch.weixin.qq.com/pay/unifiedorder
6. 商家对预支付信息签名加密后返回给小程序客户端
   - 签名方式： MD5
   - 签名字段：小程序 ID, 时间戳， 随机串，数据包，签名方式
   - 参考地址：https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_7&index=3
7. 用户确认支付（鉴权调起支付）
   - API: wx.requestPayment()
8. 微信服务器返回支付结果给小程序客户端
9. 微信服务器推送支付结果给商家服务器端



## 分包

官方文档：https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages.html

1. 为什么要分包

   - 小程序要求压缩包体积不能大于 2M，否则无法发布

   - 实际开发中小程序体积如果大于 2M 就需要使用分包机制进行发布上传

   - 分包后可解决 2M 限制，并且能分包加载内容，提高性能

   - 分包后单个包的体积不能大于 2M

   - 整个小程序所有分包大小不超过 20M

2. 分包形式

   - 常规分包
   - 独立分包
   - 分包预下载

3. 常规分包

   特点：

   - 加载小程序的时候先加载主包，当需要访问分包的页面时候才加载分包内容
   - 分包的页面可以访问主包的文件，数据，图片等资源
   - 主包：除了分包以外的内容都会被打包到主包中。通常放置启动页/tabBar 页面

   实现：在 app.json subpackages 字段声明项目分包结构 

   ```json
   {
       "pages":[
           "pages/index",
           "pages/logs"
       ],
       "subpackages": [
           {
               "root": "packageA", // 分包根目录
               "name": "A", // 分包别名，分包预下载时可以使用
               "pages": [ // 分包页面路径，相对与分包根目录
                   "pages/cat",
                   "pages/dog"
               ],
               "independent": false // 分包是否是独立分包
           }, 
           {
               "root": "packageB",
               "name": "pack2",
               "pages": [
                   "pages/apple",
                   "pages/banana"
               ]
           }
       ]
   }
   ```

   

4. 独立分包

   特点：

   - 独立分包可单独访问分包的内容，不需要下载主包
   - 独立分包不能依赖主包或者其他包的内容

   实现：设置 independent 为 true

   使用场景：通常某些页面和当前小程序的其他页面关联不大的时候可进行独立分包，如：临时加的广告页 || 活动页

   

5. 分包预下载

   特点：

   - 开发者可以通过配置，在进入小程序某个页面时，由框架自动预下载可能需要的分包，提升进入后续分包页面时的启动速度。
   - 对于独立分包，也可以预下载主包。
   - 分包预下载目前只支持通过配置方式使用，暂不支持通过调用API完成。

   实现：

   - 预下载分包行为在进入某个页面时触发，通过在 `app.json` 增加 `preloadRule` 配置来控制。
   - key(页面路径): {packages: [预下载的包名 || 预下载的包的根路径])}

   ```json
   {
       "pages": ["pages/index"],
       "subpackages": [
           {
               "root": "important",
               "pages": ["index"],
           },
           {
               "root": "sub1",
               "pages": ["index"],
           },
           {
               "name": "hello",
               "root": "path/to",
               "pages": ["index"]
           },
           {
               "root": "sub3",
               "pages": ["index"]
           },
           {
               "root": "indep",
               "pages": ["index"],
               "independent": true
           }
       ],
       "preloadRule": {
           "pages/index": {
               "network": "all",
               "packages": ["important"]
           },
           "sub1/index": {
               "packages": ["hello", "sub3"]
           },
           "sub3/index": {
               "packages": ["path/to"]
           },
           "indep/index": {
               "packages": ["__APP__"]
           }
       }
   }
   ```

   

6. 4

7. 5

8. 6

9. 7

10. 8

11. 配置
    a) app.json 中设置 preloadRule 选项
    b) key(页面路径): {packages: [预下载的包名 || 预下载的包的根路径])}
     前端课程系列- - 小程序
    —————————————————————————————
    35
    更多 Java –大数据 –前端 –python 人工智能资料下载，可访问百度：尚硅谷官网

12. 特点:
    a) 在加载当前包的时候可以设置预下载其他的包
    b) 缩短用户等待时间，提高用户体验
    8.8.6 分包效果演示
     前端课程系列- - 小程序
    —————————————————————————————
    36
    更多 Java –大数据 –前端 –python 人工智能资料下载，可访问百度：尚硅谷官网
    8.8.7 官网对应地址
    https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages.html





## 使用 npm 包

1. 初始化 package.json

   npm init

2. 本地设置中，勾选允许使用 npm

3. 下载 npm 包

   npm install packageName

4. 构建 npm

   开发工具 ---> 工具 ---> 构建 npm

   会将 node_modules 中的包打包到 miniprogram_npm 中

   

   

## 设置体验权限

开发阶段分享给微信好友，默认没有体验权限，无法打开分享小程序，需要在开发页面设置

最多添加 15 个微信好友

