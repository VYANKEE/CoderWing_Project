
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  discount: Number
});

module.exports = mongoose.model('Product', productSchema);
