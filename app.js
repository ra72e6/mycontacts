const express = require('express');
const app = express();
const dbConnect = require('./config/dbConnect');
const methodOverride = require('method-override');
app.set('View engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));
app.use(methodOverride('_method'));
dbConnect();

app.get('/', (req, res) => {
  res.send('Hello, Node!');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/contacts', require('./routes/contactRoutes'));

app.listen(3000, () => {
  console.log('서버 실행 중');
});
