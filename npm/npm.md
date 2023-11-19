
npm username ifengli
npm password Feng1213500072
npm email 1424102009@qq.com

包管理地址：
https://www.npmjs.com/settings/ifengli/packages

npm config set registry https://registry.npm.taobao.org 
npm config set registry https://registry.npmjs.org/
初始化项目

1. pnpm init  生成 package.json

2. tsc --init 生成ts 的配置文件 tsconfig.json

3. 新建 vite 配置文件 vite.config.ts

4 .新建 index.d.ts 声明文件


安装依赖

pnpm i vue -D
 
pnpm i vite -D


npm发布包

1. npm adduser  没有账号则添加账号

2. npm login 登录npm账号

3. npm publih --access=public 发布包

用户配置文件：我们在用一个账户登录电脑的时候，我们可以为当前用户创建一个 .npmrc 文件，之后再用这个账户登录 ，就可以使用这个配置文件去 指定源下载，去使用这个配置文件。可以通过 npm config get userconfig 来获取文件位置；
全局配置文件：一台电脑可能有多个用户，在这些用户之上，可以设置一个公共的 .npmrc 文件，供所有用户使用。该文件的路径为：$PREFIX/etc/npmrc，使用 npm config get prefix 获取$PREFIX。如果你不曾配置过全局文件，该文件不存在。