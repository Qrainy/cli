## Span Cli

Span 脚手架

#### 一期

| 功能           | 命令                      | 描述                                       |
| -------------- | ------------------------- | ------------------------------------------ |
| `create`       | span create `projectName` | 创建项目: 暂时 `vue3.0+vite+ts` 生成的模版 |
| `husky`        | span add husky            | git 提交规范                               |
| `mock`         | span add mock             | 模拟数据                                   |
| `css-reset`    | span add css-reset        | 样式格式化                                 |
| `axios-strong` | span add axios-strong     | 二次封装、规范 `api` 请求方式              |

- 简易安装：直接使用`create` + 你的项目名称即可（包括`husky`、`mock`...，全功能）
- 手动安装：手动选择配置文件。

#### 最终版本（TODO）

- 集`vue`、`react`各个版本的集合，
- 且含有`typescript`、`vite`、`webpack` 的选项。
- 配合`eslint`、`tslint`、`husky`、`prettier`, 规范项目。
- `mock`模拟数据
- `css`样式格式化
- `pug`、`jade` 模板引擎
- `utils` 工具包
- `vue`：`axios` 二次封装、规范 `api` 请求方式
- ...

## 安装

```
yarn global add span-cli
```

或者

```
npm install -g span-cli
```

## 创建应用

运行以下命令开始创建

```
span create projectName
```
