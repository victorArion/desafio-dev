const express = require("express")
const app = express()
const cors = require('cors')
const router = require("./router")
const connection = require("./config.json")
const port = connection.bk.door

app.use(cors())

app.use(router)
app.listen(port);

