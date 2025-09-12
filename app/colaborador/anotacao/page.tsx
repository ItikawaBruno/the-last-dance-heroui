'use client'

import { useState } from "react";
import { Textarea, Input } from '@heroui/input'
import { Button } from '@heroui/button'

export default function Anotacoes(){

    const [ listaAnotacao, setListaAnotacao ] = useState<{titulo:string,anotacao:string}[]>([])
    const [ titulo , setTitulo ] = useState('')
    const [ anotacao, setAnotacao ] = useState('')
    const [ anotacaoSelecionada, setAnotacaoSelecionada ] = useState<{titulo:string,anotacao:string}[]>()

    function salvar(titulo:string,anotacao:string){
        if(titulo === '' || anotacao === '')return;
        const novaLista = listaAnotacao.filter((a) => a.titulo != titulo)
        setAnotacao(anotacao)
        setTitulo(titulo)
        setListaAnotacao([...novaLista,{titulo,anotacao}])
        setAnotacao('')
        setTitulo('')
    }

    return(
        <>
            <div className="h-full w-full space-y-1 flex flex-col">
                <div className="w-full h-fit bg-[#ffff] text-[#000] rounded-md shadow-md flex flex-col p-2">
                    <h1 className="text-[#993399] font-semibold mb-1">Anotação</h1>
                    <Input label='Titulo' type="text" className="w-full mb-2 rounded-md" placeholder="Digite o titulo da anotação" value={titulo} onChange={(e:any) => setTitulo(e.currentTarget.value)}/>
                    <Textarea label='Anotação' placeholder="Faça suas anotações" className="w-full rounded-md min-h-[100px]" value={anotacao} onChange={(e:any) => setAnotacao(e.currentTarget.value)}></Textarea>
                    <button className="bg-[#993399] px-3 rounded-ms py-1 rounded-md mt-2 w-[80px] ml-auto text-white" onClick={() => salvar(titulo,anotacao)}>Salvar</button>
                </div>
                <div className="h-full w-full bg-[#ffff] rounded-md shadow-md pt-2 overflow-auto">
                    <h1 className="text-[#993399] ml-2 mt-2 mb-2 font-semibold">Minhas Anotações</h1>
                    <ul className="w-[95%] h-fit px-4 text-black mx-auto overflow-auto space-y-1">
                        {
                         listaAnotacao.map((a,i) => (
                            <li key={i} className="bg-[#ebebeb] flex justify-between p-2 rounded-md items-center">
                                <p>{a.titulo}</p>
                                <Button className="p-2 bg-[#993399] rounded-md text-white">Visualizar</Button>
                            </li>
                         ))   
                        }
                    </ul>
                </div>
            </div>
        </>
    );
}