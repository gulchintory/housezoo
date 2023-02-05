const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookingSchema = new Schema({
  bookingDate: {
    type: Date,
    default: Date.now
  },
  pets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Pet'
    }
  ]
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
