const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const logRoutes = require('./routes/logs');
app.use('/api/logs', logRoutes);

const PORT = process.env.PORT || 1080; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
