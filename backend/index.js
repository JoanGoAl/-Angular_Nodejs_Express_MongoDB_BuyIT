// Imports
const express = require("express");
const mongoose = require('mongoose')
require('dotenv').config()

let client = require('prom-client');
const app = express();
const port = 3000;

const counterPracticaEndpoint = new client.Counter({
    name: `_endpoint`,
    help: `Total de peticiones para el endpoint`
})

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

app.use('/api', require('./src/routers'))

app.use('/metrics', (req, res) => {
    res.set('Content-Type', client.register.contentType);
    client.register.metrics().then(data => res.send(data))
});

mongoose.connect(`mongodb://mongodb:27017/buyIT`, {
    useNewUrlParser: true,
    authSource: "admin",
    user: process.env.USERNAME,
    pass: process.env.PASSWORD
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Server Listening on http://localhost:${port} 🚀`)
})