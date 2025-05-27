const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Product = require('./models/product');

const app = express();
const port = 3000;


mongoose.connect('mongodb://127.0.0.1:27017/shop');



app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.get('/seed', async (req, res) => {
  await Product.deleteMany({});
  const insertedProducts = await Product.insertMany([
    { name: 'HAVIT HV-G92 Gamepad', price: 120, discount: 30 },
    { name: 'AK-900 Wired Keyboard', price: 100, discount: 25 },
    { name: 'IPS LCD Gaming Monitor', price: 375, discount: 32 },
    { name: 'S-Series Comfort Chair', price: 375, discount: 23 }
  ]);
  console.log("Inserted Products:", insertedProducts);
  res.send('Database seeded!');
});


app.get('/', async (req, res) => {
  const products = await Product.find();
  console.log("Products fetched from DB:", products);
  res.render('index', { products });
});



app.get('/login', (req, res) => {
  res.render("login");
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

