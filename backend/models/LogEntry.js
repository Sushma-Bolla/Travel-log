const mongoose = require('mongoose');

const LogEntrySchema = new mongoose.Schema({
    title: String,
    description: String,
    location: String,
    date: Date,
    rating: Number,
});

module.exports = mongoose.model('LogEntry', LogEntrySchema);
