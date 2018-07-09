# mysql

## 注意点

+ 登录等不了？
+ 使用大写，全部使用大写
+ 安装时设置了默认的用户密码  root root 
+ 默认安装路径， C:\Program Files\MySQL\MySQL Server 5.7\bin
+ 启动服务 需要data文件夹，同mongo类似
+ 命令一定要带分号
+ 大小写不敏感


> 启动数据服务

    mysqld

> 显示数据库 

    SHOW DATABASES

    
> 创建数据库 

    CREATE DATABASE user_info
    
> #是备注

    #auto_increment只是MySQL特有的
    
> 选择数据库 

    USE user_info

> 创建表

    `id` INT UNSIGNED AUTO_INCREMENT UNIQUE,
        PRIMARY KEY (`ID`)

    CREATE TABLE IF NOT EXISTS `user`(
        `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT UNIQUE,
        `username` VARCHAR(20) NOT NULL UNIQUE,
        `password` VARCHAR(40) NOT NULL,
        `phone` Int(11) NOT NULL,
        `sex` TINYINT(2) UNSIGNED DEFAULT 1,
        `address` VARCHAR(40),
        `register_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
        `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )ENGINE=InnoDB DEFAULT CHARSET=utf8;


    ①not null：非空约束，指定某列不为空

　　②unique：唯一约束，指定某列和几列组合的数据不能重复

　　③primary key：主键约束，指定某列的数据不能重复、唯一

　　④foreign key：外键，指定该列记录属于主表中的一条记录，参照另一条数据

　　⑤check：检查，指定一个表达式，用于检验指定数据


    UNIQUE：可选。表示索引为唯一性索引。
    FULLTEXT；可选。表示索引为全文索引。
    SPATIAL：可选。表示索引为空间索引。
    INDEX和KEY：用于指定字段为索引，两者选择其中之一就可以了，作用是一样的。

    
> 显示表

    show tables
    
> 删除表

    drop table user

> 修改表

    //修改一个字段的类型
    alter table user MODIFY new1 VARCHAR(10);
    //修改一个字段的名称，此时一定要重新指定该字段的类型
    alter table user CHANGE new1 new4 int;