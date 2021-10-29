const express = require('express');
const router = express.Router();
const Busboy = require('busboy');
const evento = require("./evento.js")

router.post("/read_file", async (req, res, next) => {
    let chunks = [], file_name, file_type, file_encoding;
    let busboy = new Busboy({ headers: req.headers });
    let body = {}
    let insertEvent = {}

    //Retira os campos adicionais enviados
    busboy.on('field', function(name, value) {
        body[name] = value;
    });

    //Insere os dados do arquivo
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        file_name = filename;
        file_type = mimetype;
        file_encoding = encoding;
        file.on('data', function(data) {
            chunks.push(data)
        });
    });
    
    busboy.on('finish', async function() {
        chunks = Buffer.concat(chunks)
        insertEvent = await evento.evento(chunks, body.cd_pav_evento_parametro_tipo)
        
        res.status(200).send({status: insertEvent.status, idInserido: insertEvent.insertId});
    });
    
    req.pipe(busboy);
});

module.exports = router;