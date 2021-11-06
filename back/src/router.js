const express = require('express');
const router = express.Router();
const processFile = require('./controls/control');

router.get("/bk/:router", async (req, res, next) => {
    const router = req.params.router;
    const query = req.query;
    let response;

    switch (router){
        case "find_mov_cnab":
            response = await processFile.find_mov_cnab(query)
            break;
        case "find_mov_cnab_total":
            response = await processFile.find_mov_cnab_total(query)
            break;
        default:
            response = {status:404,info:"Route not found"}

    }
    res.status(response.status).send(response);
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

router.delete("/bk/:router", async (req, res, next) => {
    const router = req.params.router;
    const query = req.query;
    let response;

    switch (router){
        case "delete_file":
            response = await processFile.delete_file(query)
            break;
        default:
            response = {status:404,info:"Route not found"}

    }
    res.status(response.status).send(response);
});

module.exports = router;