const express = require("express")
const app = express()
const cors = require('cors')
const router = require("./router")
const connection = require("./config.json")
const bodyParser = require('body-parser');
const port = connection.bk.door

app.use(cors())


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router)
app.listen(port);

