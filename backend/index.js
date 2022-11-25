// Imports
const express = require("express");
const mongoose = require('mongoose')
require('dotenv').config()

const app = express();
const port = 3000;

app.use(require('./src/routers'))

mongoose.connect(`mongodb://${process.env.USERNAME}:${process.env.PASSWORD}@mongodb:27017/buyIT`, {
    useNewUrlParser: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Server Listening on http://localhost:${port} 🚀`)
})