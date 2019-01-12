php环境是：php5.6.27-nts + Apache + mysql 5.7.21

端口：9096

将整个文件以platform名字放入WWW文件，数据库同名导入

修改app下database.php数据库配置

（若端口或文件夹名字有修改，需修改config.php下的__HOST__）

进入地址：http://localhost:9096/platform/public/index.php/organization/index/index/index

react源码在react-platform

npm install

npm start

chrome/Firefox再安装个Allow-Control-Allow-Origin: * 跨域插件即可获取数据

![](https://github.com/Y-qwq/assess-organization/blob/master/%E5%9B%BE.png)  