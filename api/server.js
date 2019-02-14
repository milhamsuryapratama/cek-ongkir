const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const dataRouter = require('../api/routes');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors());
app.use("/", dataRouter);

app.listen(3011, function () {
    console.log('server listening on port 3011')
})