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