// const withCSS = require('@zeit/next-css')
// module.exports = withCSS();
// 增加 ./ root 路徑 (提通 npm run export 建立靜態網頁，並且 ./ 為跟目錄)
const withCSS = require('@zeit/next-css');
module.exports =  withCSS({
  cssModules: false,
  assetPrefix: './'
})

