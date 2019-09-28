const express = require('express')
const next = require('next')
// PORT
const PORT = process.env.PORT || 5000;

// 判斷開發環境或生產環境 (development/production)
process.env.NODE_ENV = (typeof process.env.NODE_ENV !== 'undefined')
  ? process.env.NODE_ENV.trim()
  : 'development';
console.log('開發環境:' + process.env.NODE_ENV);
// 判斷是否為開發環境
const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()
  // 所有的 express.get 都改分配給 next handle 處理
  server.get('*', (req, res) => {
    return handle(req, res)
  })
    
  server.listen(PORT, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:' + PORT)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})