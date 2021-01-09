---
title: hexo-sakura踩坑记
author: dummerfu
avatar: 'https://wx1.sinaimg.cn/large/006bYVyvgy1ftand2qurdj303c03cdfv.jpg'
authorLink: dummerfu.tk
categories: 随笔
comments: true
abbrlink: 52131
date: 2021-01-08 22:51:58
tags: hexo,
description: 主题美化踩坑记
photos: https://cdn.jsdelivr.net/gh/dummerchen/My_Image_Bed01@master/img/20210105115956.jpg
---

# hexo-sakura 踩坑记

## 关于主题

[用的是Sakura](https://github.com/honjun/hexo-theme-sakura)但是建议clone其他人已经美化好的，而不是honjun的~~似乎有些未完成功能，而且之间白嫖美化好的不香吗~~，

~~本人已经自己魔改了许多，也碰到许多坑，故在此记录~~

## 说说板块|artitalk

[artitalk官网](https://artitalk.js.org/) 已经说的很全了这里补充几点：

> 官网说：如果要把valine和artitalk同时打开用在一个leancloud应用就行了

但是！！！我出错了，一个应用里面还是报appId can't redefine（就是artitalk调用的是valine的id）很神奇。

![image-20210108230722359](https://gitee.com/dummerchen/MY_IMAGE_BED/raw/master/20210108230722.png)



解决方法：

* [根据这篇文章来](https://www.yuque.com/amtoaer/aqeozr/uq7bsq) ~~似乎是廖雪峰的？？原文没找到~~ 

    但是本蒟蒻太菜了，没有看懂（里面还说了一种解决方法是可以放一个app里面用同一个class？怎么和官网不大一样…）

* 将valine和artitalk分开，二者不同时使用（判断下window.loaction.pathname!='/shuoshuo/'就行了）

其他操作可参考：

[Artitalk说说心情发布页面（个性定制）](https://blog.csdn.net/cungudafa/article/details/106224223)~~这个里面部署是老版本的建议看美化部分就行了~~





然后发现valine安全性不高，我选择twikoo😂~~喂喂，还不到一个小时吧~~



可以参考[hexo-sakura部署twikoo]()