const {desafio} = require('./conection')
const { callDataBase } = require('./utils/callDataBase')

const controles = {

    evento: async function(body, idEvent, chunks){
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

        console.log(sql)
        const inserted_event = await callDataBase(desafio, sql)
        console.log(inserted_event)

        return inserted_event
    }
}

module.exports = controles;