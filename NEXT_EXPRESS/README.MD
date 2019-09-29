
[next getting started](https://nextjs.frontendx.cn/docs/#%E7%A6%81%E6%AD%A2%E6%96%87%E4%BB%B6%E8%B7%AF%E7%94%B1)

[NEXTJS中文文档](https://raoenhui.github.io/nextjs/2018/08/31/Nextjs%E4%B8%AD%E6%96%87%E6%96%87%E6%A1%A3/)

[Next.js入门教程](https://www.chkui.com/article/react/nextjs_getting_starting)

建置 next.js 執行環境，如同建置 react ，要注意開發環境(development)、生產環境(production)的差異，以免執行的是測試版本而非做最終版本。

重點在於 package.json 的規劃。

package.json 

```json=
  "scripts": {
    "next-dev": "next",
    "dev": "node server.js",
    "build": "next build",
    "start": "next start",
    "start-win": "set NODE_ENV=production && node server.js",
    "start-mac": "NODE_ENV=production && node server.js",
    "export": "next export"
  }
```
scripts 說明如下
1. "next-dev": "next" 一般在DEV開發階段的時候會有 Hot Module Replacement (HMR) 只要在程式碼有變更就會自動幫你動更新網頁但是在產品發佈的時候就不需要這個功能。
2. "dev": "node server.js" 以 node 執行 server.js，屬於開發環境(development)，任何 程式碼修正都會重新顯示。
3. "build": "next build" 建立生產環境(production)屬於編譯過的環境。
4. "start": "next start" 以 next 直接執行生產環境的程式，是給 Production 發佈用 執行前先跑 npm run build。
5. "start-win": "set NODE_ENV=production && node server.js" (Winddows版本)設定成生產環境，並且以 node 執行 server.js，執行前先跑 npm run build。
6. "start-mac": "NODE_ENV=production && node server.js" (Mac / Linux 版本)設定成生產環境，並且以 node 執行 server.js，執行前先跑 npm run build。
6. "export": "next export" Next.js 提供了一個靜態輸出的功能，可以不輸出server side 只把靜態頁面輸出。

注意事項
1. npm start & npm run start-win & npm run start-mac 結果相同，都是啟動 server.js 執行生產環境的程式
2. npm start & npm run start-win & npm run start-mac 執行之前必須執行 npm run build 建立生產環境。
3. start-windows / start-mac 所做的設定因環境不同而設定
3.1 Linux 環境：寫成 "start": "NODE_ENV=production node server.js"
3.2 Windows 環境：寫成 "start-2": "set NODE_ENV=production && node

(有人會寫成下面這種)
另外若要適應於不同環境，可以增加 cross-env 程式碼來調整
使用cross-env解決跨平台設定NODE_ENV的問題
1. npm install cross-env --save-dev
2. scripts 裡改寫成 "start": "cross-env NODE_ENV=production node server.js" 即可

```json=
{
  "name": "custom-server-express",
  "version": "1.0.0",
  "scripts": {
    "dev": "node server.js",
    "build": "next build",
    "start": "cross-env NODE_ENV=production node server.js"
  },
  "dependencies": {
    "express": "^4.14.0",
    "next": "latest",
    "react": "^16.7.0",
    "react-dom": "^16.7.0"
  },
  "devDependencies": {
    "cross-env": "^5.2.0"
  }
}
```

