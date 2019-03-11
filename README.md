# schoolmall-web

#### 介绍
school mall
毕设项目前端部分，采用模块化开发，使用基本html/css/js以及css预编译语言stylus，模块化采用webpack,并使用webpack-dev-server作为简单服务器端程序。

#### 使用方式
1. 下载
```
git clone https://gitee.com/ysgeek/schoolmall-web.git
```
2. `cd schoolmall-web`
   `npm install` / 或 `yarn install` (如果您安装了yarn)
3. 如果您第一次启动可以使用`npm run first`这会自动打开浏览器并进入项目，如果新建网页什么都没有，在后面加上`/view`,例如：`localhost:8080/view`
   如果您不想自动打开浏览器，可以使用`npm run dev`
4. 可能您在某些地方会出现404错误，不要害怕，这是因为跨域造成的，后期开发好后端程序，可以配合使用，就不会出错了

#### 项目预览
// 暂无，这两天会加上

#### 打包命令
可以使用`npm run build`进行对项目的打包，打包后会生成dist目录，里面存放打包好的静态资源文件
