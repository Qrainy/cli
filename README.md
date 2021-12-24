## Span Cli

Span 脚手架

#### 一期

| 功能        | 命令               | 描述                                           | 是否已实现 |
| ----------- | ------------------ | ---------------------------------------------- | ---------- |
| `create`    | span create `name` | 创建项目: 暂时 `vue3.0+vite+ts` 生成的模版     | ✅         |
| `husky`     | span add husky     | git 提交之前，对`暂存区`检查、`commit`提交规范 | ✅         |
| `mock`      | span add mock      | 模拟数据                                       | ✅         |
| `axios`     | span add axios     | 二次封装、规范 `api` 请求方式                  | ✅         |
| `css-reset` | span add css-reset | 样式格式化                                     | ❌         |

- 自动安装：包含以上全部功能，`husky`、`mock`、`axios`...
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
span create name
```

运行一下命令开始创建子应用

```
span add <plugin>
```
