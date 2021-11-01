const {desafio} = require('./conection')
const { callDataBase } = require('./utils/callDataBase')

const events = {
    process_file: async function (data) {

        const file = this.find_file({file_uploader:data.file_uploader})

        await Promise.all(file.data.map(async(item_file,ifi)=>{
        
        
            const body = item_file.st_body.toString();
            const line = body.split('\n');
            
            await Promise.all(line.map((item_line,ili)=>{
                const tipo = item_line.slice(0,1)
                const data = item_line.slice(1,10)
                const valor = item_line.slice(10,21)
                const cpf = item_line.slice(21,32)
                const cartao = item_line.slice(32,44)
                const hora = item_line.slice(44,)
                const dono_loja = item_line.slice()
                const nome_loja = item_line.slice()
            }))
        }))
        

    },
    find_file: async function (data) {

        let sql  = '';

        if(data.file_uploader){
            sql  = `SELECT * FROM file_uploader WHERE pk_file_uploader IN (${data.file_uploader})`
        }


        const inserted_event = await callDataBase(desafio, sql)
    }

}

module.exports = events;