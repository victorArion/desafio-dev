const express = require("express")
const app = express()
const cors = require('cors')
const router = require("./router")
const connection = require("./configuracoes.json")
const port = connection.arquivo.porta

app.use(cors())

app.use(router)
app.listen(port);


// app.use(express.urlencoded({
//     limit: "20mb",
//     extended: true
// }))

