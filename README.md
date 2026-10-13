# GLORY 页脚 · WhatsApp 版本 2

[在线预览](https://huangheping.github.io/glory-footer-v2/)

定稿页面仅展示底部页脚，上方留白。媒体入口位于页脚浅绿色背景内，整组居中；桌面图标间距40px，媒体栏下方分隔线通栏。信息区上下留白按可见文字边缘调整；版权文字居中，版权栏48px，上方不设分隔线。

WhatsApp 使用版本2：1.8秒动效后停留1秒，完整循环2.8秒。使用更新后的图标SVG与中央带WhatsApp标识的二维码。悬停显示二维码，浮层向页脚内展开；链接文字「打开 WhatsApp ↗」为 #025B52，无关闭按钮。

## 本地预览

下载仓库，保持文件结构，用浏览器打开 `index.html`。也可在此目录执行 `python3 -m http.server 4174 --bind 127.0.0.1`，访问 http://localhost:4174/ 。

## 页面文件

- `index.html`：独立页面。
- `footer-v2.css`：定稿页脚布局。
- `whatsapp-entry.js`：Lottie入口及扫码浮层。
- `assets/whatsapp-v2.json`：定稿Lottie动画；`assets/animations.js` 为本地加载资源。
- `assets/whatsapp-icon.svg`、`assets/whatsapp-qr.svg`：更新后的图标与二维码。
- `assets/site`：官网页脚样式、Logo与原媒体图标。
- `vendor`：lottie-web播放器及其许可证。

此仓库独立于GAIP和之前的四版动效对照项目。
