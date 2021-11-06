import { useEffect, useState, useRef } from 'react';

import {bk,upload_file} from "../../utils/conection"
import "../../css/importar.css"

function Importar(props) {

    const [aquivosImportados, setAquivosImportados] = useState([])
    const [aquivosImportadosDados, setAquivosImportadosDados] = useState([])
    const [renderizar, setRenderizar] = useState(false)
    const [error, setError] = useState(false)
    const [errorMensagem, setErrorMensagem] = useState('')
    const modal = useRef();

    //Cria um evento para validar se ouve um click fora da modal
    useEffect(()=>{
        document.addEventListener('mousedown', clickFora);
        return () => document.removeEventListener('mousedown', clickFora);
    },[])

    //Caso ocorra um click fora do elemento em questao e fechado a mesma
    const clickFora = e => {
        if (!modal.current.contains(e.target)) {
            fecharModal()
        }
    };

    //Le o arquivo importado e faz o cadastro do evento
    async function importarArquivo(event) {
        setError(false)
        if(event.target.files[0].type !== "text/plain"){
            setError(true)
            setErrorMensagem("Arquivo não suportado")
            return null
        }
        
        
        let data = new FormData();
        data.append('file', event.target.files[0]);
        data.append('fk_file_uploader_origin', 1);

        await upload_file.post("/read_file", data)
        .then((response)=>{
            aquivosImportados.push(response.data.data.insertId)
            aquivosImportadosDados.push({
                name: event.target.files[0].name,
                id:response.data.data.insertId
            })
            setRenderizar(!renderizar)
        })
        document.getElementById(event.target.id).value = null
    };
    
    //Mapeia os dados de arquivo e os renderiza
    function gerarArquivosImportados(){
        if(!Array.isArray(aquivosImportadosDados)){
            return null;
        }
        return aquivosImportadosDados.map((item_arquivo,ia)=>{
            return <div>
                        <span className="file-imported-span">{item_arquivo.name}</span>
                        <button className="btn-file-imported-apagar" onClick={() => deletarArquivo(item_arquivo.id)}>
                            Apagar
                        </button>
                    </div>
        })
    }

    //Faz a delecao de um arquivo importado
    async function deletarArquivo(arquivo){
        if(!Array.isArray(aquivosImportadosDados) && !Array.isArray(aquivosImportados)){
            return null;
        }

        aquivosImportadosDados.map((item_arquivo,ia)=> {
            if(item_arquivo.id === arquivo){
                aquivosImportadosDados.splice(ia,1)
            }
        })
        aquivosImportados.map((item_arquivo,ia)=> {
            if(item_arquivo === arquivo){
                aquivosImportadosDados.splice(ia,1)
            }
        })

        await bk.delete("/bk/delete_file?file_uploader="+arquivo);
        setRenderizar(!renderizar)
    }   

    //Ao fechar a modal e preciso deletar os arquivos importados
    async function fecharModal(){
        if(Array.isArray(aquivosImportados)){
            await Promise.all(
                aquivosImportados.map(async(item,i)=>{
                    await bk.delete("/bk/delete_file?file_uploader="+item);
                })
            )
        }

        props.setRevelarImportar(false)
    } 

    //Envia pro processamento do arquivo
    async function processarArquivos(){
        await bk.post("/bk/process_file",{file_uploader:aquivosImportados})
        .then((response)=>{
            if(response.data.status === 200){
                fecharModal()
            }
        })
        .catch((erro)=>{
            setError(true)
            if(erro.response){
                setErrorMensagem(erro.response.data.info)
            }
            else{
                setErrorMensagem("Erro ao fazer o processamento dos arquivos")
            }
        })
    }


    return (
        <div ref={modal} className="importa-arquivo-corpo">
            <div>
                <button className="btn-fechar-modal" onClick={() => fecharModal()}>X</button>

                <div>
                    <input type="file" id="input-arquivo" onChange={(e) => importarArquivo(e)} className="input-arquivo"/>
                    <button className="btn-inportar-arquivo" onClick={() => document.getElementById('input-arquivo').click()}>
                        Importar
                    </button>
                </div>
            </div>
            {error &&
                <span className='msg-alerta-error'>{errorMensagem}</span>
            }
            <div className="file-imported">
                {aquivosImportadosDados.length > 0 &&
                    <div className="file-imported-corpo">
                        {gerarArquivosImportados()}
                    </div>
                } 
                <div className="file-imported_confirmar_cancelar">
                    <button className="file-imported_cancelar" onClick={() => fecharModal()}>Cancelar</button>
                    <button className="file-imported_confirmar" onClick={() => processarArquivos()}>Confirma</button>
                </div>
            </div>
        </div>
    );
}

export default Importar;
