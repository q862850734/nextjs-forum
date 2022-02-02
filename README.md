## 安装依赖

```bash
npm i
```

## 数据库部署

1. 复制 `.env.example` 到 `.env`，然后填配置信息

> 数据库链接配置 （PostgreSQL）
>
> DATABASE_URL= postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA

![](https://raw.githubusercontent.com/uid-vhan/notebook-imgs/main/imgs/m7l8KVo.png)

登录方式配置

```
# 邮箱登录
EMAIL_SERVER_USER= # 邮箱
EMAIL_SERVER_PASSWORD= # 密码
EMAIL_SERVER_HOST= # smtp.example.com 例如：stmp.163.com
EMAIL_SERVER_PORT= # 一般是 465 看网站具体说明
EMAIL_FROM=noreply@example.com

# GitHub登录
GITHUB_ID=
GITHUB_SECRET=

NEXTAUTH_URL=http://localhost:3000
SECRET= # Linux: `openssl rand -hex 32` or go to https://generate-secret.now.sh/32
```

2. 初始化数据库，并生成数据

```bash
npx prisma migrate dev
```

## 运行

```bash
npm run dev
```
