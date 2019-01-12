&emsp;&emsp;这算是学习react以来第一个demo吧，因为是当时是为了赶作业做的，所以代码写的很混乱，将就着能演示出效果就成了(￣y▽,￣)╭ ，而且是小组作业，我只负责翻译评估机构的，其他什么乱七八糟的交换生，管理员，院校角色，在这里，都没有= =，后台thinkphp是即学即用随便写了几个接口混过去的

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
