const {desafio} = require('../conection')
const { callDataBase } = require('../utils/callDataBase')

const events = {
    insert_event: async function(body, idEvent){
        let sql = `INSERT INTO file_uploader (
                            fk_file_uploader_origin, 
                            st_body, 
                            fl_executed
                        )
                        VALUES (
                            ${idEvent},
                            '${body}',
                            0
                        )`

        return await callDataBase(desafio, sql)
    }
}

module.exports = events;