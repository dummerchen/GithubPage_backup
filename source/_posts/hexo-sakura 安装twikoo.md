---
title: hexo-sakura 安装twikoo
author: dummerfu
authorLink: dummerfu.tk
categories: 随笔
comments: true
abbrlink: 64378
tags: 主题美化
description: twikoo--国产评论之光
photos: https://cdn.jsdelivr.net/gh/dummerchen/My_Image_Bed01@master/img/20210105114702.jpg
date: 2021-01-08 22:51:58
---

# why twikoo ？

> 操作简单，配置方便小白友好。~~valine各种自己改配置~~
>
> 基于腾讯云开发，安全有保障。
>
> valine和artitalk兼容性并不是很好…
>
> valine v1.4.0停止更新！！！
>
> 

# hexo-sakura 安装twikoo

老样子，先附上[官网](https://twikoo.js.org/)

其实官网已经详细的不能再详细了…所以这篇文章主要是面向sakura主题还不会自己魔改的小白



搭建twikoo分两步：

> 1. 在本地的博客主题中配置 Twikoo；
> 2. 在腾讯云配置环境和云函数；



## 腾讯云配置

官网说的已经很清楚了，不再赘述

## 本地配置

### config.yml

主题下的_config.yml增加类似和valine增加enable项

![image-20210109232911072](https://gitee.com/dummerchen/MY_IMAGE_BED/raw/master/20210109232911.png)

代表启用twikoo，envid是腾讯云里面的环境里面那个envId 一般是appname-xxx这种形式

### head.ejs

在mashiro_option那一串增加一项

```html
mashiro_option.t_envID = "<%= theme.twikoo.envId %>";
```



![image-20210109233527906](https://gitee.com/dummerchen/MY_IMAGE_BED/raw/master/20210109233528.png)



### comment.ejs

这里的valine本来是honjun改php的残留，可以顺便删了

## Sakura-app.js

创建函数TO()

![image-20210124001506768](C:%5CUsers%5CLenovo%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20210124001506768.png)

这里有个坑，el如过有的话会加载失败，把官网瞄点id是tcomment改成twikoo就行了，~~神奇的bug~~

然后在pjax渲染里面增加相应的函数初始化就行了

![image-20210124001830767](https://gitee.com/dummerchen/MY_IMAGE_BED/raw/master/20210124001830.png)

因为每个页面都可能要渲染所以**要加两个**

最后在footer加上twikoo的cdn就行了我是引用的本地，你换成 https://cdn.jsdelivr.net/npm/twikoo@0.6.0/dist/twikoo.all.min.js 就行了，位置在script那一块

![image-20210109234454286](https://gitee.com/dummerchen/MY_IMAGE_BED/raw/master/20210109234454.png)



## 完结撒花

​	可以享受评论了，虽然限流量，但是官网说10000次/日以内是免费的，所以这个看个人吧。~~我很放心😜~~。

其他进阶设置比如表情cdn啊之类的，官网都已经在设置里配置好了很方便。