# Ionic介绍

[Ionic Vue](https://ionicframework.com/docs)



# 环境安装配置

1.安装 java 环境 和 安卓编辑器sdk

- java JKD 下载[www.oracle.com/java/techno…](https://link.juejin.cn?target=https%3A%2F%2Fwww.oracle.com%2Fjava%2Ftechnologies%2Fdownloads%2F%23java8-windows)
- 安卓编辑器下载 [developer.android.google.cn/studio/](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.android.google.cn%2Fstudio%2F)

安装完成检查环境变量

安装完成检查环境变量

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5d9257eb30f4cc9a120d0e5c8ca0a00~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ecae96f71534f9b94bf855401837e01~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/937818565942400fbeee5c3d22153221~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

检查安卓编辑器的sdk 如果没安装就装一下

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/21d8ce62b45d4f1290b1d352f272415c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)



# 安装 ionic

```bash
npm install -g @ionic/cli
```



# 初始化项目

```bash
ionic start [name] [template] [options]
#            名称      模板    类型为vue项目
ionic start app tabs --type vue
```



# 安卓预览

```bash
npm run build
ionic capacitor copy android
```

预览

```bash
ionic capacitor open android
```

# 热更新技术

```
ionic capacitor run android -l --external
```

