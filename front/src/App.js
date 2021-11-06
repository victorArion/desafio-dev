import { useState } from 'react';

import './css/App.css';
import Movimentacao from './components/movimentacao/tabela';
import Importar from './components/movimentacao/importar';


function App() {
    const [revelarImportar, setRevelarImportar] = useState(false)

    return (
        <div className="App">
            <header className="App-header">
            </header>
            <body className="App-body">
                <button className="btn-importar-arquivo" onClick={() => setRevelarImportar(true)}>
                    Importar arquivo
                </button>
                <Movimentacao/>
                {revelarImportar &&
                    <div className="tela-importar">
                        <Importar setRevelarImportar={setRevelarImportar}/>
                    </div>
                }
                
            </body>
        </div>
    );
}

export default App;
