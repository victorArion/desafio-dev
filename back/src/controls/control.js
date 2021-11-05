const {desafio} = require('../conection')
const { callDataBase } = require('../utils/callDataBase')

const events = {
    process_file: async function (data) {
        //Variavel para controle de erro na execucao
        let error = {
            searchType:false,
            insertMovCnab:false,
            insertMovCnabData:[]
        };

        //Consulta eventos
        const file = await this.find_file({file_uploader:data.file_uploader})

        //Valida erro na consulta
        if(file.status !== 200){
            return {status:501,info:"Internal search error"}
        }
        if(file.data.lenght === 0 || file.data.lenght !== data.file_uploader.lenght){
            return {status:404,info:"Event not found"}
        }

        //Varre os eventos que retornaram da consulta
        await Promise.all(file.data.map(async(item_file,ifi)=>{
            //Faz a separacao dos dados pela quebra de linha            
            const line = item_file.st_body.split('\n');
            
            //Varre todas as linhas do arquivo
            await Promise.all(line.map(async (item_line,ili)=>{
                const tipo = item_line.slice(0,1)
                const data = item_line.slice(1,9)
                const valor = item_line.slice(9,19)
                const cpf = item_line.slice(19,30)
                const cartao = item_line.slice(30,42)
                const hora = item_line.slice(42,48)
                const donoLoja = item_line.slice(48,62)
                const nomeLoja = item_line.slice(62,81)


                //Faz a formatacao da data
                const dt_data = data.slice(0,4) + '-' + data.slice(4,6) + '-' + data.slice(6,8) + ' ' + hora.slice(0,2) + ':' + hora.slice(2,4) + ':' + hora.slice(4,6)
                
                //Normalizacao do valor
                const n_value = valor / 100.00;


                const cnabType = await this.find_cnab_type({n_type:tipo})

                //Caso a consulta de algum dos tipos der errado, sera validado posteriormente
                if(cnabType.status !== 200 || cnabType.data.lenght === 0){
                    error.searchType = true
                    error.insertMovCnabData.push({
                        pk_file_uploader:item_file.pk_file_uploader,
                        line_error_data:item_line
                    })
                    return null;
                }
                const pk_mov_cnab_type = cnabType.data[0].pk_mov_cnab_type;



                const insert = await this.insert_mov_cnab({
                    pk_mov_cnab_type: pk_mov_cnab_type, 
                    st_card: cartao,
                    n_cpf: cpf, 
                    n_value: n_value, 
                    st_store_name: nomeLoja.trim(), 
                    st_store_owner: donoLoja.trim(),
                    dt_data: dt_data
                })

                if(insert.status !== 200){
                    error.insertMovCnab = true
                    error.insertMovCnabData.push({
                        pk_file_uploader:item_file.pk_file_uploader,
                        line_error_data:item_line
                    })
                }
            }))

        }))

        //Atualiza os arquivos para ja executados
        this.update_file_uploader({fl_executed:true,file_uploader:data.file_uploader})

        //Valida se ocorreu erro em alguns dos passos e faz a limpeza do que ococr
        const validateError = Object.values(error).filter(err => err === true);
        if(validateError.lenght > 0){
            //TODO validar se tiver mais de um evento de insercao
            
            //Organiza os dados 
            const line_error_data = error.insertMovCnabData.map((item_insert_mov,iiv)=>{{
                return item_insert_mov.line_error_data
            }})

            //Seta os arquivos que deram errado como nao lidos
            this.update_file_uploader({
                    fl_executed:false,
                    file_uploader:error.insertMovCnabData[0].pk_file_uploader,
                    line_error_data:line_error_data
            })


            return {status:501,info:"Internal execute error"}
        }

       
        
        return {state:200,data:"Event occurred successful"}

    },
    find_file: async function (data) {

        let sql  = '';

        if(data.file_uploader){
            sql  = `SELECT * FROM file_uploader WHERE pk_file_uploader IN (${data.file_uploader})`
        }


        return await callDataBase(desafio, sql)
    },

    find_cnab_type: async function (data) {

        let sql  = '';

        if(data.n_type){
            sql  = `SELECT * FROM mov_cnab_type WHERE n_type IN (${data.n_type})`
        }


        return await callDataBase(desafio, sql)
    },

    update_file_uploader: async function (data) {

        let sql  = ' UPDATE file_uploader ';

        if(data.file_uploader && data.fl_executed === true){
            sql  = ` SET fl_executed = 1 WHERE pk_file_uploader IN (${data.file_uploader})`
        }
        if(data.file_uploader && data.fl_executed === false && data.line_error_data){
            sql  = ` SET fl_executed = 0, st_body = "${data.line_error_data}" WHERE pk_file_uploader IN (${data.file_uploader})`
        }


        return await callDataBase(desafio, sql)
    },

    insert_mov_cnab: async function (data) {

        let sql  = '';

        sql  = ` INSERT INTO mov_cnab (
                    fk_mov_cnab_type, 
                    st_card,
                    n_cpf, 
                    n_value, 
                    st_store_name, 
                    st_store_owner,
                    dt_data
                )
                VALUES (
                    ${data.pk_mov_cnab_type},
                    "${data.st_card}",
                    ${data.n_cpf},
                    ${data.n_value},
                    "${data.st_store_name}",
                    "${data.st_store_owner}",
                    "${data.dt_data}"
                )`

        return await callDataBase(desafio, sql)
    },

    find_mov_cnab: async function (data) {

        let sql  = ` SELECT 
                        mc.pk_mov_cnab, 
                        mct.st_mov_cnab_type,
                        mct.st_category,
                        mc.n_cpf, 
                        mc.n_value, 
                        mc.st_card, 
                        mc.st_store_name, 
                        mc.st_store_owner, 
                        mc.dt_data 
                    FROM mov_cnab mc
                    LEFT JOIN mov_cnab_type mct ON mct.pk_mov_cnab_type = mc.fk_mov_cnab_type `

        if(data.limit !== undefined &&  !isNaN(data.limit)){
            sql += ` LIMIT ${data.limit} `
        }
        if(data.offset !== undefined && !isNaN(data.offset)){
            sql += ` OFFSET ${data.offset}`
        }  
        
        return await callDataBase(desafio, sql)
    },

}

module.exports = events;