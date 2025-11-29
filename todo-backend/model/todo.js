const mongoose = require('mongoose');
const TodoSchema = new mongoose.Schema({
  message: { type: String, required: true },
  due_date: { type: Date, required: true },
  start_date: { type: Date, required: true },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Todo', TodoSchema);
