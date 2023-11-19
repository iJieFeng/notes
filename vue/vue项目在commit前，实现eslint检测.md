## git-commit前，实现eslint检测

1. 下载依赖

```
npm install --save-dev lint-staged husky
```

2 package.json配置

scripts标签配置

```json
"scripts": {
    "precommit": "lint-staged" // precommit钩子执行lint-staged
},
"lint-staged": {
    "src/**/*.{js,json,css,vue}": [
        "eslint --fix",
        "git add"
    ]
},
```

使用git钩子

```json
"gitHooks": {
    "pre-commit": "lint-staged" // precommit钩子执行lint-staged
},
"lint-staged": {
    "src/**/*.{js,json,css,vue}": [
        "eslint --fix",
        "git add"
    ]
},
```

