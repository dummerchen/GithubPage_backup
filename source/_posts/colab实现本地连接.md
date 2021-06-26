---
title: Colab 实现本地连接
author: dummerfu
authorLink: dummerfu.tk
comments: true
abbrlink: 64572
categories: 技术
tags: python
photos: https://cdn.jsdelivr.net/gh/dummerchen/My_Image_Bed02@image_bed_001/img/20210601202753.jpg
date: 2021-06-01 00:00:00
description: jupyter的奇淫技巧
---



## 痛点

​	虽说colab可以挂载谷歌云，但是机器学习方面的数据集传输一直都是个麻烦事，更别说fq传网盘上了~~你上传速度快？那可以右上角了~~

​	再退一步，虽然可以共享文件，但是本地还是不能同步修改也算一个痛点，那么干脆直接将colab直接挂载在本地算了。然而看网上的奇淫技巧估计都是老博客了，也没有谈到这方面，所以干脆自己记录一下。

​	ps: 似乎挂载本地就不能用colab的GPU了（虽然更改笔记本设置gpu还是会提示你重新连接，但是速度似乎是和本地一样快？）~~本地了个寂寞~~

## 安装依赖

<div class='tip bug'>本实例都是在window环境下运行，未尝试linux</div>



不多解释~~都学到用colab了别和我说还不会pip安装依赖~~

```bash
#　安装 安装jupyter
pip install notebook

# 启用jupyter_http_over_ws jupyter 扩展程序（连接到本地需要
pip install jupyter_http_over_ws jupyter serverextension enable --py jupyter_http_over_ws

# 启动jupyter 最后一行参数是为了挂载到本地后能打开自己的文件
# 虽然缺乏安全性，但是是最快解决403的方法，有时间再找找其他替代方案
jupyter notebook \
  --NotebookApp.allow_origin='https://colab.research.google.com' \
  --port=8888 \
  --NotebookApp.port_retries=0
  --NotebookApp.disable_check_xsrf=True
```

## 连接到本地



直接点colab连接选择连接到本地然后就按照他的提示来就行了

**注意挂载的目录是运行jupyter 里那个config.py里默认的目录**

## 一点点优化

先进入配置的jupyter_notebook_config.py文件 **后面简称config文件**

```bash
# 生成配置文件（有就不用生成了）

jupyter notebook --generate-config

# 进入上面显示的路径
# 进入config.py 
```



### 更换默认目录

搜索 notebook_dir更改为自己的工作路径

```python
c.Notebook_dir='xxx'
```



### alias

~~每次输入这么多参数多麻烦~~

搜索notebook.app，根据按照依赖里面的参数进行修改默认值，~~自己想改什么随便改不用按照我的来~~

```python
# 我修改了下面几个的值（也没改动多少
	
c.NotebookApp.allow_origin = 'https://colab.research.google.com'

c.NotebookApp.port_retries=0

c.NotebookApp.disable_check_xsrf = True

# 默认就是8888，也可以不改
c.NotebookApp.port = 8888


```



### 更改token

因为每次连接到本地运行都要输入token，可以将token设置为固定值~~也相当于password了~~

不过这样运行的时候命令行里面不会显示token具体值

```bash
# 只会像这样显示
http://localhost:8888/?token=...
```



还是再之前那个config.py里面设置

```python
c.NotebookApp.token = '你的token'
```

<div class="tip warning">后面还是会在命令行里面输出log日志，会显示token所以不是私人电脑千万别固定token</div>



### 取消自动重定向

每次打开一个new tab很烦人~~我又不用jupyter写代码~~

```bash
# config里面修改
# 关闭自动打开browser
c.NotebookApp.open_browser = False

# 不想关闭也可以选择打开的方式
#  
#   - 2 opens a new tab,
#   - 1 opens a new window,
#   - 0 opens in an existing window.
#  
c.NotebookApp.webbrowser_open_new = 2
```



### 后台运行

每次命令行不能关闭好麻烦啊 ~~不会杀进程的小白慎用~~

```bash
# 在上述命令的最后加一个 & ，则该命令产生的进程在后台运行，不会影响当前终端的使用（我们在只有一个bash的环境下）。
# ctrl c之后还在运行，但是关掉窗口就会停止
jupyter notebook &

# 在命令的开头加一个nohup，忽略所有的挂断信号，如果当前bash关闭，则当前进程会挂载到init进程下，成为其子进程，这样即使退出当前bash，其8000端口也可以使用。
nohup jupyter notebook &
```



### 开机启动

~~个人没兴趣，应该配置开机启动项之类的就行了~~

