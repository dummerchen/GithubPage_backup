---
title: Git Action 自动部署hexo
author: dummerfu
authorLink: dummerfu.tk
categories: 随笔
comments: true
abbrlink: 15888
tags: 主题美化
description: git action 是个好东西
photos: https://cdn.jsdelivr.net/gh/dummerchen/My_Image_Bed02@image_bed_001/img/20210704165106.jpg
date: 2021-07-04 22:51:58
---



## 痛点

~~日常水字数~~

hexo部署之后总是会觉得每次写完要一键三连比较麻烦，特别是文章写多了后generate会很慢，这个时候要是有个能写完文章或者push后自动一键三连岂不美哉？

在git action出来之前，网上有这种脚本，什么加alias，监听deploy啊，但是这些还是会在自己本地上显示generate出来的东西影响观感~~

下面简单介绍一下Git Action和我踩的坑，（没想到时隔半年，我居然会又部署一遍这个…



## 正文

### Git Action实现

#### 准备密匙

在根目录下面.ssh里面生成一对名为github-action-deploy的密匙（公匙后缀为pub

```bash
ssh-keygen -t rsa -b 4096 -f ~/.ssh/github-actions-deploy
```

在github主页面的 `Settings`->`SSH and GPG keys`添加刚刚生成的公钥，名称随意。 在`blog`仓库的`Settings`->`Secrets`里添加刚刚生成的私钥，名称为 `ACTION_DEPLOY_KEY` 这个一定要一样，不想后面直接复制yml文件后出问题萌新就不要名字了。

#### 配置hexo

```yml
# Deployment
# Docs: https://hexo.io/docs/deployment.html
# 目前不清楚第一个deploy有什么用，下面那样也行
deploy:
- type: git # 最好是git
  repo: git@github.com:xxxx.git # 使用仓库的ssh地址
  branch: master # 分支名


# backup
# - type: git
#   repo: git@github.com:xxxx.git # 仓库地址
#   branch: 
```

#### 配置Git Action

在配置私钥的仓库点击`Action`->`new workflow` 创建一个main.yml文件

```yml
name: Compile and Deploy to GitHub Page
on:
  push:
    branches:
      - master # 你的branch |一般是 master
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1

    - uses: actions/setup-node@v1
      with:
        node-version: '13.x' #不同版本可能会有不兼容的npm包，后面会说坑
          
    - name: Setup hexo
      env: 
      # secrets选项中你配置私匙的名字，前面一样就不用改
          ACTIONS_DEPLOY_KEY: ${{ secrets.ACTIONS_DEPLOY_KEY }} 
      run: |
        mkdir -p ~/.ssh/
        echo "$ACTIONS_DEPLOY_KEY" > ~/.ssh/id_rsa
        chmod 600 ~/.ssh/id_rsa
        ssh-keyscan github.com >> ~/.ssh/known_hosts
        git config --global user.email "xxx" # github邮箱
        git config --global user.name "xxx"  # github用户名
        npm install hexo-cli -g
        npm install
    
    - name: Generate
      run: hexo clean && hexo generate && hexo deploy
```

### 坑点

### hexo-uitl

~~之前Git Action用的好好的,换个主题突然就出bug了~~

![image-20210704153929038](C:/Users/Lenovo/AppData/Roaming/Typora/typora-user-images/image-20210704153929038.png)

这个错误很**隐晦**，表面上是这个highlight.js错误但是实际上是hexo-uitl不支持node12版本以下，这个在之前的`setup hexo`

里面有提到，因为不是error没有注意，弄我半天…~~也算是我水这篇博客的原因~~

![image-20210704155108843](https://cdn.jsdelivr.net/gh/dummerchen/My_Image_Bed02@image_bed_001/img/20210704155108.png)

在yml文件把node-version改高点就行了 ~~弄我debug一天~~

