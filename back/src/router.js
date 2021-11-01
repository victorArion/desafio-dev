const express = require('express');
const router = express.Router();
const processFile = require('./processFile');

router.get("/bk/:router", async (req, res, next) => {
    const router = req.params.router;
    const body = req.body;

    res.status(200).send({status: insertEvent.status, idInserido: insertEvent.insertId});
});


router.post("/bk/:router", async (req, res, next) => {
    const router = req.params.router;
    const body = req.body;

    await processFile(body)
    

    res.status(200).send({status: insertEvent.status, idInserido: insertEvent.insertId});
});

module.exports = router;