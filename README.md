# 参与贡献

该项目Github Pages部署在 `Master` 分支, 英文源码在 `source` 分支, 中文源码在 `cn` 分支.

网站是用 `js` 和 `markdown` 进行编写, 文件存放在 `site/` 目录, 核心代码位于 `site/_core/`.

### 如何进行改动

安装项目依赖:

<<<<<<< HEAD
```bash
npm install
# 或
yarn
```
=======
The first time, get all the dependencies loaded via

`$ npm install` or `$ yarn install`
>>>>>>> source

然后执行:

<<<<<<< HEAD
```bash
npm start
# 打开 http://localhost:8444/
```

在你改动内容之后, 只需要刷新浏览器就能够观察到变化.

### 发布到网站

`cn` 分支通过 Travis CI 自动部署到 https://graphql.js.cool/
=======
`$ npm start` or `$ yarn start`

Open [http://localhost:8444](http://localhost:8444) to view it in the browser.
Anytime you make some changes, refresh the page to see the updates.

### Publish the Website

Once pushed to the `source` branch, Travis CI will publish http://graphql.org
>>>>>>> source
