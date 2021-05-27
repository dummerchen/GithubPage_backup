---
title: Linux 文件传输
mathjax: true
date: 2021.5.27
author: dummerfu
authorLink: dummerfu.tk
categories: 杂集
comments: true
tags: Linux
photos: >-
  https://cdn.jsdelivr.net/gh/dummerchen/My_Image_Bed02@image_bed_001/img/20210507235146.jpg
abbrlink: 14426
description: 文件传输痛点终于解决了
keywords:
---

# 杂谈

​	昨日去实验室，发现电脑又换了~~每次去都要配次环境，佛了~~，在解压数据集的时候发现数据集损坏…

四处找工具传输，不得不吐槽Linuxqq页面和06年qq一样，qq是指望不上了。~~最后还是靠的U盘~~

​	现在发现一个好用的传输工具python包？，无需下载安装，可以跑满带宽，支持多下载方式，只需要提供数据源有python环境并且处在**一个局域网下**即可，它就是—— **http.server**！！

~~这不比网上的fps，scp便捷？？？感觉是解决了U盘不够大的问题~~

​	废话不多说直接上操作

# 共享文件

## [http.server 的基本操作](https://www.cnblogs.com/lmg-jie/p/9564608.html)



```python
# 简单使用:
# 关闭终端或ctrl C就会停止服务
python http.server 端口号

# 后台挂载
# 在上述命令的最后加一个 & ，则该命令产生的进程在后台运行，不会影响当前终端的使用（我们在只有一个bash的环境下）。
python -m http.server 8000 &

# 在命令的开头加一个nohup，忽略所有的挂断信号，如果当前bash关闭，则当前进程会挂载到init进程下，成为其子进程，这样即使退出当前bash，其8000端口也可以使用。
nohup python -m http.server 8000 &
```

<div tips="warning">python2 要将http.server 修改为 SimpleHTTPServer</div>

##　Windows

### 快速上手

打开cmd，cd到需要的共享文件夹的**上一级目录**，python -m http.server 9393

### 高级进阶

查看端口是否开放

```shell
# 查看端口是否占用，无返回则未被占用
netstat -ano |findstr "端口号"
# 若占用找到PID，查看谁占用
tasklist |findstr "PID"

# 若无关紧要，终止进程
taskkill /f /t /pid "PID" -t -f
# 也可以用name终止,比如python.exe
taskkill /f /t /im python.exe
```

![image-20210527123936242](https://cdn.jsdelivr.net/gh/dummerchen/My_Image_Bed02@image_bed_001/img/20210527123936.png)	



## Linux



```shell
# 查看ip
ifconfig -a
# 查看端口
netstat -anp
# 查看进程
ps -ef
# 杀死进程(-9强制杀死)
kill -9 PID
# 通过名字精确杀死
killall firefox
# 模糊查找，杀死所有包含firefox的进程
pkill firefox
```



## 访问



浏览器中输入：你的ip:9393就可以访问了，类似下面的样子，建议将文件夹打包这样就可以直接下载文件夹

![image-20210527122842821](https://cdn.jsdelivr.net/gh/dummerchen/My_Image_Bed02@image_bed_001/img/20210527122842.png)

缺点就是只能同一个局域网访问，但是也可以做端口映射达到公网访问的效果（不建议办公网络使用

~~反正家庭网络也没什么值得攻击的，只要不设置80，3389，443这种端口映射就行~~

