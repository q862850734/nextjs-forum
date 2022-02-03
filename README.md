## 说明



### 介绍

> 基于 Next Js 同构的 "论坛" 项目



### 技术栈

- Next Js  `React 服务端渲染框架`
- Prisma  `数据库 ORM`
- Nexus `用于生成 GraphQL schema`
- Apollo Server `GraphQL 服务器`
- Apollo Client `GraphQL 客户端`
- Next-Auth `身份验证的第三方库`
- Material UI `React UI 组件库`



### 完成度

- 首页简单的渲染了一下，GraphQL 是真的好用， 不过写 type 是真的头疼。
- 可以切换主题（配色略丑）
- 可以邮箱和 github 登录（需要配置 .env 环境变量）





## 安装依赖

```bash
npm i
```



## 数据库部署

### 1. 配置环境变量

复制 `.env.example` 到 `.env`，然后填配置信息

> 数据库链接配置 （PostgreSQL）
>
> DATABASE_URL= postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA

![](https://raw.githubusercontent.com/uid-vhan/notebook-imgs/main/imgs/m7l8KVo.png)

```
# 邮箱登录
EMAIL_SERVER_USER= # 邮箱
EMAIL_SERVER_PASSWORD= # 密码
EMAIL_SERVER_HOST= # smtp.example.com 例如：stmp.163.com
EMAIL_SERVER_PORT= # 一般是 465 具体看网站说明
EMAIL_FROM=noreply@example.com

# GitHub登录
GITHUB_ID=
GITHUB_SECRET=

NEXTAUTH_URL=http://localhost:3000
SECRET= # Linux: `openssl rand -hex 32` or go to https://generate-secret.now.sh/32
```



### 2. 初始化数据库

```bash
npx prisma migrate dev # 初始化后自动执行 prisma/seed.ts 添加Mockjs生成的假数据
npx prisma studio # 可快速访问数据库
```





## 运行

```bash
npm run dev
```
