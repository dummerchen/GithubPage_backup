---
title: YoloV3 介绍
author: dummerfu & zzy
authorLink: dummerfu.tk
categories: 随笔
comments: true
abbrlink: 3028
tags: python
description: Yolo网络学习,zzy主笔 ヾ(≧▽≦*)o
photos: https://cdn.jsdelivr.net/gh/dummerchen/My_Image_Bed02@image_bed_001/img/20210507235145.jpg
date: 2021-06-01 00:00:00
---



# yolo算法背景介绍

Yolo算法是一些一阶段的目标检测算法，这一类的算法的特点是只用一个卷积神经网路(CNN)来直接预测不同目标的类别和位置。工业界中最常用的yolo版本为yolov3，其检测与识别速度与准确率已经在实践中证明可行。

#  Yolov3网络结构介绍

​	首先yolov3会将输入图片通过一系列带残差结构的卷积神经网络（backbone）进行特征提取，在论文中这个网络使用的是DarkNet-53，其结构示意如下：

![img](https://cdn.jsdelivr.net/gh/dummerchen/My_Image_Bed02@image_bed_001/img/20210524225210.jpg) 

​	上图中的Convolutional为二维卷积和BN层以及LeakyReLU激活函数的堆叠。Residual为残差结构网络，如图所示，将输入经过1x1和3x3的卷积处理之后与原输入相加为新的输出。

​	此处是预训练时的网络结构，在图片分类的数据集中进行预训练，可以加载其预训练权重来迁移学习，缩短训练的时间。

​	得到DarkNet提取之后的特征，进一步对该特征进行卷积和上采样操作，提高了特征的细粒度，有利于我们的网络预测小目标，并且与来自darknet的中间层输出进行拼接（concatenate）以便于进行进一步的卷积，得到三种不同尺度大小的输出，分别用于大目标，中等大小目标，小目标的预测。下图为网络结构图：

 

![img](https://cdn.jsdelivr.net/gh/dummerchen/My_Image_Bed02@image_bed_001/img/20210524225051.png) 

上图为根据原论文以及官方源码所画出的示意图，我们可以根据以上示意图搭建出yolov3算法的主体网络。

## yoloV3的预测

​	根据上图,可以发现输入一张416x416大小的图片，可以得到三种不同尺度的预测特征图:

* Predict one的size为(Batch_size,3*(1+4+classes),13,13),

* Predict two的size为(Batch_size,3*(1+4+classes),26,26),

* Predict three的size为(Batch_size,3*(1+4+classes),52,52).

​	这些张量的channel上的维度（即size元组上第二位的值）的含义为，在每一个特征图上的点都进行3个bounding box的预测，bounding box即目标的预测框的候选框。三个bound ing box的大小如下图设置：

![img](https://cdn.jsdelivr.net/gh/dummerchen/My_Image_Bed02@image_bed_001/img/20210524225227.jpg) 

​	对于每个bounding box，我们需要预测以下的指标：其一是置信度（confidence），这一指标的含义时bounding box中是否包含着目标，即候选框与实际框的IOU值。其二是候选框的中心坐标偏移量与在特征图上的宽高缩放比(tx,ty,tw,th)。其三为每个classes的置信度。故channel上的数值为3(bounding box数量)*(1(目标置信度)+4(确定框的坐标)+classes(classes个置信度))。

对于目标分类任务重点在于候选框参数的调整，yolov3采取和yolov2一致的候选框调整策略。下图展示了目标边界框的预测过程。图中虚线矩形框为预设边界框，实线矩形框为通过网络预测的偏移量计算得到的预测边界框。其中(cx,cy)为预设边界框在特征图上的中心坐标，(pw,ph)为预设边界框在特征图上的宽和高，(tx,ty,tw,th)分别为网络预测的边界框中心偏移量(tx,ty)以及宽高缩放比(tw,th)，(bx,by,bw,bh)为最终预测的目标边界框，从预设边界框到最终预测边界框的转换过程如图右侧公式所示，其中函数是sigmoid函数其目的是将预测偏移量缩放到0到1之间（这样能够将预设边界框的中心坐标固定在一个1x1大小的cell当中，这样能够加快网络收敛）。

# 损失函数

YOLOv3 损失函数包括三部分：边界框回归损失，目标置信度损失，目标分类损失
$$
L(O,o,C,c,l,g)=\lambda_1L_{conf}(o,c)+\lambda_2L_{cla}(O,C)+\lambda_3L_{loc}(l,g)
$$

## 目标置信度损失

​	目标置信度可理解为预测目标是前景还是背景的概率（是否为待识别目标），显然可以看作是一个二分类，采用交叉熵回归损失：

$L_{conf}(o,c)=-\sum(o_i*ln(\hat c))+(1-o_i)*(ln(1-\hat c_i)) $

其中 $\hat c=sigmod(c)$,$o_i \in {0,1}$代表是否为目标，$c_i$代表预测目标框中存在目标的sigmod概率。

## 目标类别损失

 判断前景和背景后就应该预测目标类别，所以目标类比损失是一个多分类损失，但是也可以用二分类损失。

因为可以认为一个物体可以被多个分类概括，比如牧羊犬既属于动物还属于狗，可以使算法更具有鲁棒性。
$$
L_{cla}(O,C)=-\sum_{i\in pos}\sum_{j\in cla}(O_{ij}*ln(\hat C_{ij} ))+(1-O_{ij})*ln(1-\hat C_{ij})
$$


i属于第i个预测目标，cla代表预测目标的分类，$$O_{ij}$$代表是否存在第i个预测目标中第j类是否存在，$C_{ij}$代表第i个目标属于j的概率

## 目标定位损失

​	在一个目标检测算法中，既要衡量预测类比的准确率还要衡量边界框与预测类别是否对应。现在预测类别分类的损失函数已经知道了只需要计算边界框回归损失即可：
$$
L_{loc}(l,g)=\sum_{i\in pos}\sum_{j \in \{x,y,w,h\}} (\hat l-\hat g)^2
$$
这里使用的是SE损失函数，其中i代表第i个预测边界框，j属于第i个边界框的参数，l是预测的第i个边界框的参数，g是已知真实的预测边界框参数。

