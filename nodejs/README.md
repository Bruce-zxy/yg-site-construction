## 文件介绍 ##

----**bin** # APP启动入口

----**lib** # 封装好的db类

----**routes** # 请求路由

----**views** # View模板


## 使用说明 ##

1、 创建pg数据库 cms

	psql -U <-your user->*;
	<--Input password-->
    CREATE DATABASE cms;
	<--Ctrl + C-->

2、 创建表以及插入数据

    pgsql -U <-your user-> -d cms -f CMS.sql;

3、 运行在本地服务器

	npm start