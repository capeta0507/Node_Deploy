const express = require('express');

// Constants
const PORT = 3000;
// App
const app = express();
// 提供靜態檔案顯示
app.use('/html', express.static(__dirname + '/html'));

app.get('/', (req, res) => {
    res.send('Hello world ,\nNode.js + Express.js\nHTML靜態網頁');
  });

app.listen(PORT);
console.log(`Running on http://localhost:${PORT}`);