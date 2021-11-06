const express = require('express');
const router = express.Router();
const Busboy = require('busboy');
const evento = require("./controls/evento")

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
        file_type = mimetype
        file_encoding = encoding;
        file.on('data', function(data) {
            chunks.push(data)
        });
    });
    
    busboy.on('finish', async function() {
        if(file_type !== "text/plain"){
            res.status(401).send({status: 401, info: "Tipo de arquivo não permitido"})
            req.pipe(busboy);
            return undefined;
        }

        chunks = Buffer.concat(chunks)
        insertEvent = await evento.insert_event(chunks, body.fk_file_uploader_origin)
        res.status(insertEvent.status).send({status: insertEvent.status, data: insertEvent.data});
    });
    
    req.pipe(busboy);
});

module.exports = router;