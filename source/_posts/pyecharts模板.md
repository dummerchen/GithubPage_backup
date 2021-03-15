---
title: pyecharts模板
author: dummerfu
authorLink: dummerfu.tk
comments: true
abbrlink: 57635
date: 2021-01-18 17:08:12
categories: 技术
tags: pyecharts
description:
photos: https://cdn.jsdelivr.net/gh/dummerchen/My_Image_Bed01@master/img/20210105114659.jpg
---

# pyecharts Theme

```python
LIGHT = "light"
DARK = "dark"
WHITE = "white"
CHALK: str = "chalk"
ESSOS: str = "essos"
INFOGRAPHIC: str = "infographic"
MACARONS: str = "macarons"
PURPLE_PASSION: str = "purple-passion"
ROMA: str = "roma"
ROMANTIC: str = "romantic"
SHINE: str = "shine"
VINTAGE: str = "vintage"
WALDEN: str = "walden"
WESTEROS: str = "westeros"
WONDERLAND: str = "wonderland"
HALLOWEEN: str = "halloween"
```

个人比较喜欢chalk，infographic，purple-passion



# 常用配置项

[官网文档](https://pyecharts.org/#/zh-cn/)

## 初始化配置项

```python
class InitOpts(
    # 图表画布宽度，css 长度单位。
    width: str = "900px",

    # 图表画布高度，css 长度单位。
    height: str = "500px",

    # 图表 ID，图表唯一标识，用于在多图表时区分。
    chart_id: Optional[str] = None,

    # 渲染风格，可选 "canvas", "svg"
    # # 参考 `全局变量` 章节
    renderer: str = RenderType.CANVAS,

    # 网页标题
    page_title: str = "Awesome-pyecharts",

    # 图表主题
    theme: str = "white",

    # 图表背景颜色
    bg_color: Optional[str] = None,

    # 远程 js host，如不设置默认为 https://assets.pyecharts.org/assets/"
    # 参考 `全局变量` 章节
    js_host: str = "",

    # 画图动画初始化配置，参考 `global_options.AnimationOpts`
    animation_opts: Union[AnimationOpts, dict] = AnimationOpts(),
)
```

## 工具箱配置项

```python
class ToolboxOpts(
    # 是否显示工具栏组件
    is_show: bool = True,

    # 工具栏 icon 的布局朝向。
    # 可选：'horizontal', 'vertical'
    orient: str = "horizontal",

    # 工具栏组件离容器左侧的距离。
    # left 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比，
    # 也可以是 'left', 'center', 'right'。
    # 如果 left 的值为'left', 'center', 'right'，组件会根据相应的位置自动对齐
    pos_left: str = "80%",

    # 工具栏组件离容器右侧的距离。
    # right 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比。
    pos_right: Optional[str] = None,

    # 工具栏组件离容器上侧的距离。
    # top 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比，
    # 也可以是 'top', 'middle', 'bottom'。
    # 如果 top 的值为'top', 'middle', 'bottom'，组件会根据相应的位置自动对齐。
    pos_top: Optional[str] = None,

    # 工具栏组件离容器下侧的距离。
    # bottom 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比。
    pos_bottom: Optional[str] = None,

    # 各工具配置项，参考 `global_options.ToolBoxFeatureOpts`
    feature: Union[ToolBoxFeatureOpts, dict] = ToolBoxFeatureOpts(),
)

# 通常只用一个
.set_global_opts(toolbox_opts=opts.ToolboxOpts(is_show=True))
```

## visualmap_opts

可以实现某一段一种颜色，相比较markline更简洁，在不连续数据中更常用。

* max, min在自定义颜色可以不用
* 如果要自定义颜色，需要is_piecewise=True，并且每一段都要设置颜色
* 也可以自定义颜色和透明度，range_color,range_opacity

附上颜色渐变的好网站[webgradients](https://webgradients.com/)和[mycolor](https://mycolor.space/?hex=%23E7E750&sub=1)

```python
visualmap_opts=opts.VisualMapOpts(
    # type_="color", max_=220, min_=0, dimension=1,
    # range_color=['#F2FEDC','#E7E750'],
    is_piecewise=True,
    pieces=[{'min':80,'max':120,'color':'black'}]
),
```



# Graph

**graph的点必须唯一，不然会报index的错误**

模板：

```python
links=[]
nodes=[]

def get_graph_node(nodename, position, category,symbol_size,symbol):
    one_node=opts.GraphNode(
        name=nodename,
        x=position[0],
        y=position[1],
        category=category,
        symbol_size=symbol_size,
        symbol=symbol,
        label_opts=opts.LabelOpts(is_show=True,position='inside',color='white'),
    )
    return one_node

def get_graph_link(source,target,value,width):
    node_link=opts.GraphLink(
        source=source,target=target,value=int(value),
        linestyle_opts=opts.LineStyleOpts(
            # 线宽
            width=int(width),
            # 线的弯曲程度
            curve=0.3,
            # 线的透明度
            opacity="0.7",
            # 线的颜色
            color='grey',
        ),
        label_opts=opts.LabelOpts(
            is_show=False,
        )
    )
    return node_link


graph=(
    ct.Graph(
        init_opts=opts.InitOpts(
            bg_color='white',
        )
        
    )
    .add(
            "",nodes,links,
            categories=category,
            repulsion=800,
            edge_symbol=['circle','arrow'],
            layout='none',
            edge_length=500,
            
            itemstyle_opts=opts.ItemStyleOpts(opacity=0.7)
        )
    .set_global_opts(toolbox_opts=opts.ToolboxOpts(is_show=True))
)

graph.render_notebook()
# graph.render('1.html')

```

# Radar

模板

```python
radar=(
    ct.Radar(init_opts=opts.InitOpts(width="860px", height="720px",bg_color="white"))
    .add_schema(
        schema=[
            opts.RadarIndicatorItem(name="主因子1", max_=2,min_=-2),
            opts.RadarIndicatorItem(name="主因子2", max_=3,min_=-2),
            opts.RadarIndicatorItem(name="主因子3", max_=0,min_=-2),
            opts.RadarIndicatorItem(name="主因子4", max_=0,min_=-1),
            opts.RadarIndicatorItem(name="主因子5", max_=0,min_=-0.1),
        ],
        # 改变位置，但是有Page的话可以去掉
        center=["50%", "50%"],
        # 分隔线设置，感觉对雷达图没用
        splitarea_opt=opts.SplitAreaOpts(
            is_show=True, areastyle_opts=opts.AreaStyleOpts(opacity=1)
        ),
        # 文本设置
        textstyle_opts=opts.TextStyleOpts(color="black"),
    )
    .add(
        series_name="Huskies15",
        data=hus15,
        # 线型设置
        linestyle_opts=opts.LineStyleOpts(color="#CD0000",width=2,opacity=0.5),
        # 区域颜色设置
        areastyle_opts=opts.AreaStyleOpts(opacity=0.5,color='#CD0000'),
    )
    .add(
        series_name="Oppen15",
        data=opp15,
        linestyle_opts=opts.LineStyleOpts(color="#5CACEE",width=2,opacity=0.5),
        areastyle_opts=opts.AreaStyleOpts(opacity=0.5,color='#5CACEE'),
    )
    .set_series_opts(label_opts=opts.LabelOpts(is_show=True,color='black'))
    .set_global_opts(
        title_opts=opts.TitleOpts(title="队伍能力比较"), legend_opts=opts.LegendOpts()
    )
    .render("radar_chart.html")
)
```

# Line

要注意的是x轴的type，不光是list，list里面还必须是**有序的python int类型**或**string类型**

~~numpy.int32都识别不了~~

如果x是数字，要指定type_=value(默认是category)

```python
y=[6.106,6.037,5.934,5.967,5.955,6.024,6.031,5.825,5.740,5.700]
year=['1920','1930','1940','1950','1960','1970','1980','1990','2000','2010']
line=(
    ct.Line(init_opts=opts.InitOpts(bg_color='white'))
    .add_xaxis(xaxis_data=year)
    .add_yaxis(
            series_name=i,
            y_axis=y,
            # 连线是否平滑
            is_smooth=False,
            # 是否显示点
            is_symbol_show=True,
            # 点的形状样式
            symbol="circle",
            # 大小
            symbol_size=10,
            
            # 点上方标签的样式
            label_opts=opts.LabelOpts(is_show=True,font_size=13,position="top", color="#2F4858"),
            # 点的风格样式
            
            # 放上去是否显示坐标
            tooltip_opts=opts.TooltipOpts(is_show=True),
    )
    .set_global_opts(
            title_opts=opts.TitleOpts(
                title="1920-2020 music score trend ",
                pos_top="5%",
                pos_left="center",
                title_textstyle_opts=opts.TextStyleOpts(font_size=16,color='#2F4858'),
            ),
            xaxis_opts=opts.AxisOpts(
                boundary_gap=True,
                axisline_opts=opts.AxisLineOpts(is_show=False),
                # axistick_opts=opts.AxisTickOpts(
                #     is_show=True,
                #     length=25,
                # ),
                splitline_opts=opts.SplitLineOpts(
                    is_show=True
                ),
            ),
            yaxis_opts=opts.AxisOpts(
                type_="value",
                position="left",
                max_=6.2,
                min_=5.5,
            ),
            toolbox_opts=opts.ToolboxOpts(is_show=True),
            legend_opts=opts.LegendOpts(is_show=False),
        )
)
line.render_notebook()
```



# Scatter

和line差不多，就少了几个配置项（linestyle,areastyle..)

```python
scatter=(
         ct.Scatter(init_opts=opts.InitOpts(bg_color='white' ,theme=ThemeType.LIGHT))
        .add_xaxis(
            xaxis_data=pinf_list[:3500],
        )
        
        .add_yaxis(
            series_name="",
            y_axis=artist_list[:3500],
            symbol_size=10,
            label_opts=opts.LabelOpts(is_show=False),
            tooltip_opts=opts.TooltipOpts(is_show=True),
            markline_opts=opts.MarkLineOpts(
                data=[
                    opts.MarkLineItem(x=0.5,symbol=['None','None'])],
                linestyle_opts=opts.LineStyleOpts(width=2,type_='dashed',color='#2F4858'),
                ),
                
        )
        .set_global_opts(
            title_opts=opts.TitleOpts(
                title="Influencer and Genre affect",
                pos_left="center",
                title_textstyle_opts=opts.TextStyleOpts(color="#ED6087", font_size=16),
            ),
            xaxis_opts=opts.AxisOpts(
                type_="value", splitline_opts=opts.SplitLineOpts(is_show=True),
                boundary_gap=False,
            ),
            yaxis_opts=opts.AxisOpts(
                type_="value",
                position="left",
                axislabel_opts=opts.LabelOpts(is_show=False),
                axistick_opts=opts.AxisTickOpts(is_show=False),
                splitline_opts=opts.SplitLineOpts(is_show=False),
            ),
            toolbox_opts=opts.ToolboxOpts(is_show=True),
            legend_opts=opts.LegendOpts(is_show=False),
        )
)
```

# Bar

# Heatmap

```python
heatmap =(
    ct.HeatMap()
    .add_xaxis(
        x_axis,
        # splitline_opts=opts.SplitLineOpts(is_show=True)
    )
    .add_yaxis(
        "热力图直角坐标系",
        x_axis,
        data,
    )
    .set_global_opts(
        title_opts=opts.TitleOpts(title="HeatMap-基本示例"),
        visualmap_opts=opts.VisualMapOpts(is_show=True,min_=0,max_=1,range_color=['white','grey']),
    )
)
```



# 页面布局

## Page

本来只能垂直叠加，但是根据初始化的width，height也可以达到水平布局的效果，但是通过**Page.DraggablePageLayout布局可以实现任意位置、大小布局**，简称神器。

但是如果有背景色图表重叠时会相互覆盖，此时效果不如grid，背景透明时，图表覆盖则不会产生问题，优于grid。

```python
# 使用浏览器打开渲染后的 .html 文件，默认为 render.html。拖拉/调整图表位置和大小，当调整到一个适合
# 的布局时，点击左上方的 `Save Config` 按钮，下载 chart_config.json 配置文件，假设存放位置为
# ~/chart_config.json。再次渲染图表并指定其布局配置

# Warning: 请注释掉上面的的所有渲染代码，就是以下三行。因为 html 已经生成，并不需要再重新渲染一遍。
page=ct.Page(layout=ct.Page.DraggablePageLayout)
page.add(Radar15(),Radar9())
page.render('render.html')

# render.html：第一步生成的原 html 文件
# chart_config.json：第二步下载的配置文件
# my_new_charts.html：新 html 文件路径
Page.save_resize_html("render.html", cfg_file="path/chart_config.json", dest="my_new_charts.html")

# 或者可以使用 json 数据
# cfg_dict 为 json 文件里面的内容
Page.save_resize_html("render.html", cfg_dict=cfg_dict, dest="my_new_charts.html")

# Question：能否复用渲染模板？
# Answer: 可以的，渲染配置 json 数据中是以 chart_id 来作为一个图形的唯一标识符的，所以只需要在
# 第一次渲染的时候指定 chart_id 就可以啦。
# example:
# bar = bar_datazoom_slider()
# bar.chart_id = "1"
# line = line_markpoint()
# line.chart_id = "2"
# pie = pie_rosetype()
# pie.chart_id = "3"
# 然后只要以后都按这个 chart_id 来渲染图表的时候，你的布局配置就可以复用啦。
# cat chart_config.json，会发现 chart_id 是固定的啦。
```

## Grid

​	grid布局一定需要一个有坐标轴的图，如果都没有坐标轴，比如玫瑰图，可以通过设置center参数实现布局

对于不需要初始就显示完美图的可以使用Page.DraggablePageLayout手动调整位置，更为方便。





