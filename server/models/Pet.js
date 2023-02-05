const mongoose = require('mongoose');

const { Schema } = mongoose;

const petSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  petType: {
    type: Schema.Types.ObjectId,
    ref: 'PetType',
    required: true
  }
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
