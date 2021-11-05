import axios from "axios";

const config  = require('../config.json')


const bk = axios.create({
    baseURL: 'http://localhost:'+config.back.door,
});

const upload_file = axios.create({
    baseURL: 'http://localhost:'+config.upload_file.door,
});

export {bk,upload_file};