const express = require('express')  //common js
const app = express() //tạo 1 app express
const port = 8080 //port
const path = require('path');

//config template engine
app.set('views', path.join(__dirname,'/views'));
app.set('view engine', 'ejs');

//config static files
app.use(express.static(path.join(__dirname, 'public')));

//khai báo route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/homepage', (req, res) => {
  res.render('test')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})