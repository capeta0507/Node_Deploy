const express = require('express');

// Constants
const PORT = 5000;
// App
const app = express();
// 提供靜態檔案顯示
app.use('/html', express.static(__dirname + '/html'));

// 提供React build 檔案顯示
app.use('/react', express.static(__dirname + '/react_app_build'));

app.get('/', (req, res) => {
    res.send('Hello world ,\nNode.js + Express.js\nHTML靜態網頁');
  });

app.listen(PORT);
console.log(`Running on http://localhost:${PORT}`);