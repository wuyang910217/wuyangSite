### 基于Meteor开发的个人博客系统

网站地址:[wuyang][1]

#### 简介

这是Material Design风格的个人博客，功能简单但可以使用。主要参考了[Meteor Material Blog][2]这个项目，
大家有兴趣可以关注。持续开发中...

#### 特点

1. Material Design风格
2. Admin后台管理(删除文章，删除用户)
3. Admin写文章，编辑文章(Markdown支持)
4. 简单的评论功能(用户必须登录、Markdown支持)
5. 新评论的通知(目前只有Admin能够收到)
6. 文章列表分页功能
7. 简单的文章搜索功能

#### 安装配置

* 安装Meteor开发环境，本项目使用的Meteor版本是1.2.1
* 克隆本项目到本地
* 添加项目使用的包
```
meteor add iron:router
meteor add accounts-password
meteor add reactive-var
meteor add alethes:pages 
meteor add markdown 
meteor add sacha:spin
meteor add check 
```
* 在`server/main.js`中查看你的admin信息，默认已经配置好。
* 启动`meteor`，
*  在本地服务`localhost:3000/`中有登录按钮，登录成功后，可以进入`admin`后台。
* 注意：我在项目中直接使用了[**materializecss**][3]这个网站的*js和css*文件，在`client/lib`文件夹下。大家也可以添加`materialize:materialize`这个包，效果应该一样。

#### 待实现

1. 文章列表的排序(按时间、按评论人数、按喜欢的人数)
2. 评论的通知
3. 用户找回密码等功能

[1]: http://wangjuntao.com
[2]: https://github.com/tonyarash/meteor-material-blog
[3]: http://materializecss.com