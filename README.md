# EatDecision MiniApp

美食推荐微信小程序前端，输入预算和人数，获取个性化餐厅推荐。

## 技术栈

- 微信小程序原生开发

## 功能

- 输入用餐预算（元）
- 选择用餐人数（1-20人）
- 一键获取餐厅推荐列表
- 展示餐厅名称、人均消费、推荐理由

## 快速开始

1. 下载并安装 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. 打开开发者工具，导入本项目目录
3. 在「详情 → 本地设置」勾选「不校验合法域名」
4. 确保后端服务已启动（默认 `http://localhost:8080`）
5. 点击编译预览

## 配置

接口地址在 `app.js` 中配置：

```javascript
globalData: {
  apiBaseUrl: 'http://localhost:8080'  // 本地开发
  // apiBaseUrl: 'https://your-domain.com'  // 线上环境
}
```

## 项目结构

```
├── app.js                 # 全局配置（接口地址）
├── app.json               # 小程序配置
├── app.wxss               # 全局样式
├── project.config.json    # 项目配置
└── pages/
    └── index/             # 首页
        ├── index.wxml     # 页面结构
        ├── index.wxss     # 页面样式
        └── index.js       # 页面逻辑
```

## 关联后端

[eatdecision-backend](https://github.com/sunan-ruben/eatdecision-backend)

## License

MIT
