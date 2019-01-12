/*
Navicat MySQL Data Transfer

Source Server         : Mysql5.7
Source Server Version : 50724
Source Host           : localhost:3306
Source Database       : platform

Target Server Type    : MYSQL
Target Server Version : 50724
File Encoding         : 65001

Date: 2019-01-12 12:58:08
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `tp_article`
-- ----------------------------
DROP TABLE IF EXISTS `tp_article`;
CREATE TABLE `tp_article` (
  `articleid` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(20) NOT NULL,
  `author` varchar(20) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT '未完成',
  `uploadtime` datetime NOT NULL,
  `finishtime` datetime DEFAULT NULL,
  `filepath` varchar(50) NOT NULL,
  `finishpath` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`articleid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tp_article
-- ----------------------------
INSERT INTO `tp_article` VALUES ('2', '文章', '王二', '完成', '2018-12-22 10:41:35', '2018-12-22 15:12:34', '20181222\\a39a51eab7f956345a31408eccad3ad4.PNG', '20181222\\f1b040709ce29427f797cbd96dc99fd9.jpg');
INSERT INTO `tp_article` VALUES ('3', '资料', '张三', '完成', '2018-12-22 10:41:39', '2019-01-01 20:43:16', '20181222\\aec5bcddd0acf8337e3ec77904039ea5.xlsx', '20190101\\cf19ea102f3a954c68cd960eeee77f8c.xlsx');
INSERT INTO `tp_article` VALUES ('4', '资料', '李四', '完成', '2018-12-22 10:41:50', '2018-12-27 21:46:49', '20181222\\eaf8b3dc75568a7a6b48210bb602ac00.png', '20181227\\f6862322ad9a08b7b941e2e8c4956b52.zip');
INSERT INTO `tp_article` VALUES ('5', '文章', '李五', '完成', '2018-12-22 10:42:00', '2019-01-01 21:05:31', '20181222\\835a6f1e8ad86d1ed6f7548ec25523ee.jpg', '20190101\\3aaf9c4591971537839349591b4c49c9.xlsx');
INSERT INTO `tp_article` VALUES ('6', '资料', '赵六', '未完成', '2018-12-22 10:42:23', null, '20181222\\d916e316eb3d4f966e84ccfca0fe23c5.jpg', null);
INSERT INTO `tp_article` VALUES ('7', '文章', 'baba', '未完成', '2018-12-27 17:34:06', null, '20181227\\9ecab98c546438de242032a922936c4d.jpg', null);
INSERT INTO `tp_article` VALUES ('8', '文章', 'baba', '未完成', '2018-12-27 17:34:53', null, '20181227\\45358eb057e6a64563deedc266f24790.jpg', null);

-- ----------------------------
-- Table structure for `tp_assess`
-- ----------------------------
DROP TABLE IF EXISTS `tp_assess`;
CREATE TABLE `tp_assess` (
  `assessid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `infopath` varchar(50) DEFAULT NULL,
  `uploadtime` datetime DEFAULT NULL,
  `currschool` varchar(20) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT '未评估',
  `grade` int(3) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `first` varchar(30) DEFAULT NULL,
  `second` varchar(30) DEFAULT NULL,
  `recommend` varchar(30) DEFAULT NULL,
  `needrecommend` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`assessid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tp_assess
-- ----------------------------
INSERT INTO `tp_assess` VALUES ('1', '张三', '18027014029', '20181222\\a39a51eab7f956345a31408eccad3ad4.PNG', '2018-12-20 20:28:50', '中大新华', '已评估', '90', '还行', '麻省理工学院', '斯坦福大学', '麻省理工学院', '已推荐');
INSERT INTO `tp_assess` VALUES ('2', '李四', '10298309183', '20181222\\aec5bcddd0acf8337e3ec77904039ea5.xlsx', '2018-12-22 20:22:10', '中大新华', '已评估', '91', '还可以', '', '', null, null);
INSERT INTO `tp_assess` VALUES ('3', '王五', '12094819024', '20181222\\eaf8b3dc75568a7a6b48210bb602ac00.png', '2018-12-22 20:22:41', '中大新华', '已评估', '88', '优秀', '麻省理工学院', '哈佛大学', null, '未推荐');
INSERT INTO `tp_assess` VALUES ('4', '六六', '41944729747', '20181222\\aec5bcddd0acf8337e3ec77904039ea5.xlsx', '2018-12-23 17:01:29', '中大新华', '已评估', '87', 'hhhhh', null, null, null, '未推荐');
INSERT INTO `tp_assess` VALUES ('5', '七七', '9128301704714', '20181222\\eaf8b3dc75568a7a6b48210bb602ac00.png', '2018-12-23 17:02:27', '中大新华', '未评估', null, '', null, null, null, '未推荐');
INSERT INTO `tp_assess` VALUES ('6', '八八', '213817018372', '20181222\\eaf8b3dc75568a7a6b48210bb602ac00.png', '2018-12-23 17:03:13', '中大新华', '未评估', null, null, null, null, null, '未推荐');

-- ----------------------------
-- Table structure for `tp_school`
-- ----------------------------
DROP TABLE IF EXISTS `tp_school`;
CREATE TABLE `tp_school` (
  `schoolid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `recruitnumber` int(5) NOT NULL,
  `type` varchar(20) NOT NULL,
  `tuition` varchar(10) DEFAULT NULL,
  `ranking` int(5) DEFAULT NULL,
  `remark` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`schoolid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tp_school
-- ----------------------------
INSERT INTO `tp_school` VALUES ('1', '麻省理工学院', '马萨诸塞州剑桥市', '美国', '123', '私立研究型大学', '500000', '1', '很好');
INSERT INTO `tp_school` VALUES ('2', '斯坦福大学', '加利福尼亚州斯坦福', '美国', '321', '私立研究型大学', '499999', '2', '还是很牛逼啊');
INSERT INTO `tp_school` VALUES ('3', '哈佛大学', '马萨诸塞州剑桥市', '美国', '222', '私立研究型大学', '488888', '3', '反正你考不上');
INSERT INTO `tp_school` VALUES ('4', '牛津大学', '英格兰牛津市', '英国', '322', '公立研究型书院联邦制大学', '666666', '5', '还是考不上啊');
INSERT INTO `tp_school` VALUES ('5', '新加坡国立大学', '肯特岗', '新加坡', '345', '公立大学', '444444', '11', '亚洲第一欸');
INSERT INTO `tp_school` VALUES ('6', '东京大学', '东京', '日本', '232', '公立大学', '555555', '23', 'emmmm');
