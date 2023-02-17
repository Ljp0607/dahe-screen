# 大河报社

## Environment Prepare

Install `node_modules`:

```bash
npm install
```

or

```bash
yarn
```

## Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project

```bash
npm start
```

### Build project

```bash
npm run build
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### Test code

```bash
npm test
```

### Git

```
合法的提交日志格式如下(emoji 和 模块可选填)：


        [<emoji>] [revert: ?]<type>[(scope)?]: <message>

        💥 feat(模块): 添加了个很棒的功能
        🐛 fix(模块): 修复了一些 bug
        📝 docs(模块): 更新了一下文档
        🌷 UI(模块): 修改了一下样式
        🏰 chore(模块): 对脚手架做了些更改
        🌐 locale(模块): 为国际化做了微小的贡献

        其他提交类型: refactor, perf, workflow, build, CI, typos, tests, types, wip, release, dep
```
