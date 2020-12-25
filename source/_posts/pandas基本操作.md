---
title: pandas基本操作
mathjax: true
date: 2020.12.20
author: dummerchen
avatar: https://wx1.sinaimg.cn/large/006bYVyvgy1ftand2qurdj303c03cdfv.jpg
authorLink: dummerchen.tk
categories: 随笔
comments: true
tags: python
keywords: 
photos: https://cdn.jsdelivr.net/gh/dummerchen/My_Image_Bed01@master/img/20201221162542.png
---

# pandas 读取文件[^1]

[官网链接](https://pandas.pydata.org/docs/)

## read_csv

读取**txt | tsv***等类似类型文件也可以用，sep设置为**空格 | \t** 就行了

pd.read_csv(filepath_or_buffer,sep,header,dtype,engine,converters,skiprows,skipfooter,nrows,)[^2]

* filepath:：读取的文件地址或url地址

* sep：str类型，默认',' 指定分隔符。如果不指定参数，则会尝试使用默认值逗号分隔。分隔符长于一个字符并且不是‘\s+’,将使用python的语法分析器。并且忽略数据中的逗号，并且可以用正则匹配！

* header：指定第几行作为列名(忽略注解行)，如果没有指定列名，默认header=0; 如果指定了列名header=None

* dtype：例子： {‘a’: np.float64, ‘b’: np.int32} 指定每一列的数据类型，a,b表示列名

* engine：使用的分析引擎。可以选择C或者是python，C引擎快但是Python引擎功能更多一些。并且如果sep本意不是正则可以用这个来区别

    比如：sep='::'没有engine时会被识别为正则，本意是数据确实就是以::分隔的，用engine=python来区别

* converters：置指定列的处理函数，可以用"序号"也可以使用“列名”进行列的指定

* skiprows：默认值 None 需要忽略的行数（从文件开始处算起），或需要跳过的行号列表（从0开始）

* skipfooters：从文件尾部开始忽略

* nrows：从文件中只读取多少数据行，需要读取的行数（从文件头开始算起）

## read_excel

read_excel(io,sheet_name,sep,header,dtype,engine,converters,skiprows,skipfooter,nrows,)

与read_csv参数基本相同，这里只介绍额外增加的参数

* io：文件类对象 ，pandas Excel 文件或 xlrd 工作簿。该字符串可能是一个URL。URL包括http，ftp，s3和文件。例如，本地文件可写成file://localhost/path/to/workbook.xlsx
* sheet_name：默认是sheetname为0，返回多表使用sheetname=[0,1]，若sheetname=None是返回全表 。注意：int/string返回的是dataframe，而none和list返回的是dict of dataframe，表名用字符串表示，索引表位置用整数表示；

## read_json

read_json(filepath_or_buffer,orient,header,type,dtype,convert_dates,keep_default_dates,numpy,encoding,lines)	

* orient：预期的json字符串格式，orient的设置有以下几个值：
    1. 'split' : dict like {index -> [index], columns -> [columns], data -> [values]}
    2. 'records' : list like [{column -> value}, ... , {column -> value}]
    3.  'index' : dict like {index -> {column -> value}}
    4. 'columns' : dict like {column -> {index -> value}}
    5. 'values' : just the values array
* type：返回的格式(series or frame), 默认是 ‘frame’
* dtype：同csv，列的数据类型
* convert_dates：解析日期的列列表；如果为True，则尝试解析类似日期的列，默认值为True
* keep_default_dates：default True。如果解析日期，则解析默认的日期样列
* numpy：直接解码为numpy数组。默认为False；仅支持数字数据，但标签可能是非数字的。
* encoding：json编码
* lines：将每行读取为一个json对象



## read_html

read_html(io,match,flavor,header,index_col,skiprows,attrs,parse_dates)

* io：接收网址、文件、字符串。网址不接受https，尝试去掉s后爬去
*  match：正则表达式，返回与正则表达式匹配的表格
* flavor：html解释器
* index_col：同csv
* skip_rows：同csv
* attrs：属性，比如 attrs = {'id': 'table'}~~不是很懂~~
* parse_dates：解析日期





> 在pandas读取文件的过程中，最常出现的问题，就是中文问题与格式问题，希望当你碰到的时候，可以完美的解决。

# pandas查询数据

## pandas.loc

~~这个功能实在是太强大了，几乎完全不需要其他东西了~~

可以接受整数，字符串，bool的传参，注意先行后列就行了

下面两种写法相同

## pd.iloc

和loc相似，不过只能接受整数的传参



# pandas增删改查

## nan的处理



### dataframe.fillna()

[DataFrame.fillna*(value=None,method=None*,*axis=None*,*inplace=False*, *limit=None*,*downcast=None*)](https://github.com/pandas-dev/pandas/blob/v1.1.5/pandas/core/frame.py#L4311-L4328)

* value：将nan填充为的value
* method：填充方法bfill：向后寻找第一个非空进行填充,  ffill：向前寻找第一个非空进行填充
* axis：填充的坐标轴
* inplace是否赋值到原dataframe



### dataframe.dropna()

[DataFrame.dropna(*axis=0*, *how='any',*thresh=None*, *subset=None*, *inplace=False*)](https://github.com/pandas-dev/pandas/blob/v1.1.5/pandas/core/frame.py#L4887-L5026)

* axis：axis=0丢掉包含nan值的行，axis=1则为丢掉列
* how：决定是是所有行或列包含nan丢弃(all)还是只有一个就丢弃(any)

### pandas.isnull()

[pandas.isnull(obj)](https://pandas.pydata.org/docs/reference/api/pandas.isnull.html?highlight=isnull#pandas.isnull)

判断obj类里面所有值是否为null，返回bool类型



## pandas.drop

[DataFrame.drop(*labels=None*,*axis=0*, *index=None*, *columns=None*,*level=None*,*inplace=False*, *errors='raise'*](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.drop.html?highlight=drop#pandas.DataFrame.drop)

* labels：字符串或数组，需要删去的对应关键字
* axis：axis默认为0 ，即默认删除行
* index：index=labels等价于labels=labels，axis=0
* inplace：是否替换原数据



## dataframe.merge

--------

# Reference



[^1]: 本文看了[这个](https://www.bilibili.com/video/BV1UJ411A7Fs?p=14)有感而发
[^2]:读取文件参数基本都参考了：https://www.cnblogs.com/happymeng/p/10481293.html