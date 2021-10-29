async function callDataBase(pool, sqlQuery) {
    return await new Promise(function (resolve, reject) {
        pool.getConnection(function (connectionError, connection) {
            try{
                if(connection) {
                    connection.query(sqlQuery, function (erroQuery, result, columns) {
                        connection.release()
                        let answer = ''
                        //Caso ocorra erro de sintaxe
                        if(erroQuery) {
                            answer = {status:500, info:"Error SQL"}
                        }
                        else {
                            answer = {status:200, data:result}
                        }
                        resolve(answer)
                    })
                }else{
                    resolve({status:500, info:"Conection SQL error"}) 
                }
            }
            catch(error){
                reject({status:500, info:error})
            }
            
        })
    })
}


module.exports = { callDataBase }

