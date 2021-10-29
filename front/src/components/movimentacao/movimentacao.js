import { useState } from 'react';

function Movimentacao() {

    const [itens, setItens] = useState([])


    function handlerGerarTabela(){
        return itens.map((item_itens,i)=>{
            return(
                <tr>
                    <td className='tabela-generica-corpo-label'>{item_itens.NOME}</td>
                </tr>
            )
        })
    }

    return (
        <div className="App">
            <table className='tabela-generica'>
                <tbody className='tabela-generica-corpo'>
                    <tr>
                        <th className='tabela-generica-corpo-coluna-label'>Nome</th>
                    </tr>
                    {handlerGerarTabela()}
                </tbody>
            </table>
        </div>
    );
}

export default Movimentacao;
