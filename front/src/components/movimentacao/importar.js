import { useEffect, useState, useRef } from 'react';
import Dropzone from "react-dropzone";
import { uniqueId } from "lodash";

import {bk,upload_file} from "../../utils/conection"
import "../../css/importar.css"

function Importar(props) {

    const [itens, setItens] = useState([])
    const [offset, setOffset] = useState(0)
    const [paginaAtual, setPaginaAtual] = useState(1)
    const [aquivosImportados, setAquivosImportados] = useState([])
    const [aquivosImportadosDados, setAquivosImportadosDados] = useState([])
    const modal = useRef();
    const limit = 10;

    useEffect(()=>{
        document.addEventListener('mousedown', clickFora);
        return () => document.removeEventListener('mousedown', clickFora);
    },[offset])

    //Caso ocorra um click fora do elemento em questao e fechado a mesma
    const clickFora = e => {
        if (!modal.current.contains(e.target)) {
            props.setRevelarImportar(false)
        }
    };

    async function importarArquivo(event) {
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
        })

    };


    return (
        <div ref={modal} className="importa-arquivo-corpo">
            <div className="btn-fechar-modal">X</div>

            <div>
                <input type="file" id="input-arquivo" onChange={(e) => importarArquivo(e)} className="input-arquivo"/>
                <button className="btn-inportar-arquivo" onClick={() => document.getElementById('input-arquivo').click()}>
                    Importar
                </button>
            </div>
            {aquivosImportadosDados.length > 0 &&
                aquivosImportadosDados.map((item_arquivo,ia)=>{
                    return <div>
                        {item_arquivo.name}
                    </div>
                })
            }
        </div>
    );
}

export default Importar;
