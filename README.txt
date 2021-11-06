
NODE versao LTS 12.13.1 
link: https://nodejs.org/en/download/

Para instalar os módulos:
    Navegar ate o back e dar um yarn install || npm install
    Navegar ate o arquivo e dar um yarn install || npm install
    Navegar ate o front e dar um yarn install || npm install

Para rodar
    Navegar ate o arquivo - node src/index.js
    Navegar ate o back - node src/index.js
    Navegar ate o front - yarn start || npm start

Configuração do banco de dados
    Dentro de ./arquivo/src/config.json e ./back/src/config.json se encontram os arquivos de configuração de cada projeto
    Altere os dados de "host":ip do servidor "user": usuário de acesso, "password": senha de acesso 

Para rodar o teste 
    Navegar para o ./back e rodar yarn test

Script do banco de dados disponível em: ./database.sql 


Dados de transação
    
    Acesso em: http://localhost:3001/bk/find_mov_cnab
    Método: GET
    Parâmetros:
        limit   | numérico  | Valor de limite de dados a serem retornados
        offset  | numérico  | Valor para gerar offset para paginação de dados
    
    Retorno: 
        pk_mov_cnab         |   numérico                  |     Identificador 
        st_mov_cnab_type    |   string                    |     Descrição do tipo de transação
        st_category         |   string                    |     Natureza do tipo de transação
        n_cpf               |   numérico                  |     CPF do beneficiário
        n_value             |   numérico                  |     Valo da transação
        st_card             |   string                    |     Cartão utilizado na transação
        st_store_name       |   string                    |     Nome da loja
        st_store_owner      |   string                    |     Nome do dono
        dt_data             |   "YYYY-MM-DD HH:MM:SS"     |     Data da ocorrência

Somatório de todas as transações
    
    Acesso em: http://localhost:3001/bk/find_mov_cnab_total
    Método: GET
    
    Retorno: 
        total_value         |   numérico                  |     Somatório de todos os movimentos

Processamento do arquivo

    Acesso em: http://localhost:3001/bk/process_file
    Método: POST
    Parâmetros:
        file_uploader   | array de inteiro  | Identificadores dos arquivos para serem executados
        info            | string            | Descritivo do erro
    
    Retorno: String contendo "Evento processado com sucesso"
    Casos de erro: 
        "Erro de consulta interno"          |   Erro de consulta interno
        "Evento não encontrado"             |   Não encontrado arquivos enviados
        "Erro na execução internamente"     |   Erro parcial ou completo na normalização dos dados

Deleção de arquivo importados
    
    Acesso em: http://localhost:3001/bk/delete_file
    Método: DELETE
    Parâmetros:
        file_uploader   | array de inteiro  | Identificadores dos arquivos para serem deletados
    
    Retorno: 
        affectedRows:   | numérico  | Número de linhas afetadas
        changedRows:    | numérico  | Número de linhas mudadas
        insertId:       | numérico  | Identificador da tabela afetada
        message:        | string    | Messagem de alerta
        protocol41:     | boolean   | Se esta utilizando tal protocolo
        serverStatus:   | numérico  | Status de execução
        warningCount:   | numérico  | Quantidades de alertas que a execução do sql gerou

Importação de arquivo

    Acesso em: http://localhost:3002/read_file
    Método: POST
    Parâmetros enviados pelo header:
        fk_file_uploader_origin   | numérico    | Identificador de origem de importação do arquivo
        file                      | arquivo     | Arquivo
    
    Retorno: 
        affectedRows:   | numérico  | Número de linhas afetadas
        changedRows:    | numérico  | Número de linhas mudadas
        insertId:       | numérico  | Identificador da tabela afetada
        message:        | string    | message de alerta
        protocol41:     | boolean   | Se está utilizando tal protocolo
        serverStatus:   | numérico  | Status de execução
        warningCount:   | numérico  | Quantidades de alertas que a execução do sql gerou
        info            | string    | Descritivo do erro
    Casos de erro: 
        "Tipo de arquivo não permitido"          |   Tipo do arquivo enviado não é permitido