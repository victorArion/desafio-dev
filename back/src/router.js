const express = require('express');
const router = express.Router();
const processFile = require('./controls/processFile');

router.get("/bk/:router", async (req, res, next) => {
    const router = req.params.router;
    const body = req.body;

    res.status(insertEvent.status).send({idInserido: insertEvent.insertId});
});


router.post("/bk/:router", async (req, res, next) => {
    const router = req.params.router;
    const body = req.body;

    let response;

    switch (router){
        case "process_file":
            response = await processFile.process_file(body)
            break;
        default:
            response = {status:404,info:"Route not found"}

    }
    res.status(response.status).send(response);
});

module.exports = router;