const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 100 },
  // log is a map: { 'YYYY-MM-DD': true }
  log: { type: Map, of: Boolean, default: {} }
}, { timestamps: true });

module.exports = mongoose.model('Habit', habitSchema);
