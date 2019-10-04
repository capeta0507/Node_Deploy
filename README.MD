# 全端 (MERN) 部署
###### tags: `MERN` `deploy`

程式碼：[Github](https://github.com/capeta0507/Node_Deploy)

在全端的開發環境中，其架構組合最後的步驟就是部署。
本案例的後端用 node.js 開發，前端主要可以用
1. 傳統 html + css + javascript 撰寫
2. create-react-app 撰寫 CSR 程式 (Client Side Render)
3. create-next-app 撰寫 SSR 程式 (Server Side Render)

以上三種前端撰寫完成之後，如何製作成 production 整合到 node.js 後端程式環境中。

### 前端建置
本專案將建置以下資料夾，提供相同的結果
![F1 History](https://i.imgur.com/sLuZsnc.png)

1. HTML_CSS_JS : 傳統可以在瀏覽器執行的程式。
2. REACT_APP : React 前端
3. NODE_SERVER : Node + Express 後端
4. NEXT_EXPRESS : Next + Node + Express 環境

### 如何整合
#### `HTML_CSS_JS`
首先 HTML_CSS_JS 可以直接以靜態檔案整合到 NODE_SERVER 專案 server.js 中。
NODE_SERVER 環境下的 server.js
```javascript=
const express = require('express');
// PORT
const PORT = process.env.PORT || 5000;
// App
const app = express();
// 提供靜態檔案顯示
app.use('/html', express.static(__dirname + '/html'));
// 提供 React build 檔案顯示
app.use('/react', express.static(__dirname + '/react_app_build'));
// 提供 next export 檔案顯示
app.use('/next', express.static(__dirname + '/next_out'));

app.get('/', (req, res) => {
    res.send('Hello world ,\nNode.js + Express.js\nHTML靜態網頁');
  });

app.listen(PORT);
console.log(`Running on http://localhost:${PORT}`);
```
HTML_CSS_JS 裡的所有程式複製到 /NODE_SERVER/html/ 資料夾，或者直接撰寫在該資料夾裡面。
對應 node server.js 程式碼 
```javascript
app.use('/html', express.static(__dirname + '/html'));
```

#### `REACT_APP`
以 create-react-app 建置開發環境之後，要修改一下 package.json
```json=
{
  "name": "react_app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^16.9.0",
    "react-dom": "^16.9.0",
    "react-scripts": "3.1.2"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "proxy": "http://localhost:5000",
  "homepage": ".",
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}

```
說明：
> "proxy": "http://localhost:5000" 提供開發期間的主機位置，可以避免開發階段與主機不同網域的 CORS 問題。
> "homepage": "." 提供產品完成階段，設定相關引用的相對位置而非絕對位置的錯誤。

一但 React 程式撰寫完成之後，執行 npm run build ，產生 production 最終編譯完成的結果，放在 build 資料夾之下。
這時就可以複製 build 的產品放到 /NODE_SERVER/react_app_build/ 資料夾中來執行。
對應 node server.js 程式碼 
```javascript
app.use('/react', express.static(__dirname + '/react_app_build'));
```

#### `NEXT_EXPRESS`
以 create-next-app 建置開發環境之後，要修改一下 package.json
```json=
{
  "name": "next_express",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "next-dev": "next",
    "dev": "node server.js",
    "build": "next build",
    "start": "next start",
    "start-win": "set NODE_ENV=production && node server.js",
    "start-mac": "NODE_ENV=production && node server.js",
    "export": "next export"
  },
  "dependencies": {
    "@zeit/next-css": "^1.0.1",
    "express": "^4.17.1",
    "next": "9.0.6",
    "react": "16.9.0",
    "react-dom": "16.9.0"
  }
}
```
相關設定說明見 NEXT_EXPRESS 資料夾內的 README.MD 文件。

為了產生 NEXT 靜態產品檔案，需要撰寫 next.config.js。
```javascript=
const withCSS = require('@zeit/next-css');
module.exports =  withCSS({
  // cssModules: false,
  assetPrefix: './'
})
```
> assetPrefix: './' 提供產品完成階段，設定相關引用的相對位置而非絕對位置的錯誤。

一但 NEXT 程式撰寫完成之後，執行 npm run export ，產生 production 最終編譯完成的結果，放在 out 資料夾之下。
這時就可以複製 out 的產品放到 /NODE_SERVER/next_out/ 資料夾中來執行。
對應 node server.js 程式碼 
```javascript
app.use('/next', express.static(__dirname + '/next_out'));
```

以上整合到 node server.js 環境下，就可以部署到網路雲端主機去 (例如 heroku / AWS EC2)
