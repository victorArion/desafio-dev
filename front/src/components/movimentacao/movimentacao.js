import { useEffect, useState } from 'react';

import {bk} from "../../utils/conection"
import "../../css/tabela.css"

function Movimentacao() {

    const [itens, setItens] = useState([])
    const [offset, setOffset] = useState(0)
    const [paginaAtual, setPaginaAtual] = useState(1)
    const limit = 10;

    useEffect(()=>{
        consultarApi()
    },[offset])

    async function consultarApi(){
        await bk.get('/bk/find_mov_cnab?limit='+limit+"&offset="+offset)
            .then((response)=>{
                if(response.data.data.length === 0){
                    setPaginaAtual(paginaAtual-1)
                    setOffset((paginaAtual-1)*limit)
                }
                setItens(response.data.data)
            })
    }


    function gerarDadosTabela(){
        return itens.map((item_itens,i)=>{
            return(
                <tr>
                    <td className='tabela-generica-dados'>{item_itens.pk_mov_cnab}</td>
                    <td className='tabela-generica-dados'>{item_itens.st_mov_cnab_type}</td>
                    <td className='tabela-generica-dados'>{item_itens.st_category}</td>
                    <td className='tabela-generica-dados'>{item_itens.n_cpf}</td>
                    <td className='tabela-generica-dados'>{item_itens.n_value}</td>
                    <td className='tabela-generica-dados'>{item_itens.st_card}</td>
                    <td className='tabela-generica-dados'>{item_itens.st_store_name}</td>
                    <td className='tabela-generica-dados'>{item_itens.st_store_owner}</td>
                    <td className='tabela-generica-dados'>{item_itens.dt_data}</td>
                </tr>
            )
        })
    }

    function gerarTabela(){
        return <table className='tabela-generica'>
                    <tbody className='tabela-generica-corpo'>
                        <tr className='tabela-generica-corpo-coluna'>
                            <th className='tabela-generica-coluna'>Id</th>
                            <th className='tabela-generica-coluna'>Tipo</th>
                            <th className='tabela-generica-coluna'>Natureza</th>
                            <th className='tabela-generica-coluna'>CPF</th>
                            <th className='tabela-generica-coluna'>Valor</th>
                            <th className='tabela-generica-coluna'>Cartao</th>
                            <th className='tabela-generica-coluna'>Nome da loja</th>
                            <th className='tabela-generica-coluna'>Nome do dono</th>
                            <th className='tabela-generica-coluna'>Data</th>

                        </tr>
                        {gerarDadosTabela()}
                    </tbody>
                </table>
    }
    function atualizarPaginaAtual(event){
        if(event){
            setPaginaAtual(paginaAtual+1)
            setOffset((paginaAtual+1)*limit)
            return null;
        }
        if(paginaAtual !== 1){
            setPaginaAtual(paginaAtual-1)
            setOffset(offset-limit)
        }
    }

    return (
        <div className="App">
            {gerarTabela()}
            {itens.length > 0 && 
                <>
                    <button className="btn-pagina-anterior" onClick={() => atualizarPaginaAtual(false)}>
                        {"<"}
                    </button>
                    <button className="btn-pagina-proximo" onClick={() => atualizarPaginaAtual(true)}>
                        {">"}
                    </button>
                </>
            }
            {itens.length === 0 &&
                <span className='msg-alerta-sem-dados'>Não encontrado dados! Realize uma importação de arquivo</span>
            }
        </div>
    );
}

export default Movimentacao;
