const express = require('express');
const LogEntry = require('../models/LogEntry');
const router = express.Router();

router.get('/', async(req,res) => {
    const logs = await LogEntry.find();
    res.json(logs);
})

router.post('/', async (req, res) => {
    const newLog = new LogEntry(req.body);
    await newLog.save();
    res.json(newLog);
});

module.exports = router;