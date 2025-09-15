'use client'

import { useState, useEffect } from "react";
import { Textarea, Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";

type Anotacao = {
    id: number;
    titulo: string;
    anotacao: string;
};

export default function Anotacoes() {
    const [listaAnotacao, setListaAnotacao] = useState<Anotacao[]>([]);
    const [titulo, setTitulo] = useState('');
    const [anotacao, setAnotacao] = useState('');
    const [anotacaoSelecionada, setAnotacaoSelecionada] = useState<Anotacao | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    // Pega token do localStorage
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) setToken(storedToken);
    }, []);

    // Buscar anotações do backend
    useEffect(() => {
        if (!token) return;

        fetch("http://localhost:8080/anotacao", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(res => res.json())
        .then((data: Anotacao[]) => setListaAnotacao(data))
        .catch(err => console.error(err));
    }, [token]);

    // Salvar anotação
    function salvar() {
        if (!titulo || !anotacao || !token) return;

        fetch("http://localhost:8080/anotacao", {
            method: "POST",
            headers: { 
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ titulo, anotacao })
        })
        .then(res => res.json())
        .then((nova: Anotacao) => {
            setListaAnotacao(prev => [...prev, nova]);
            setTitulo('');
            setAnotacao('');
        })
        .catch(err => console.error(err));
    }

    // Remover anotação
    function removerAnotacao(id: number) {
        if (!token) return;

        fetch("http://localhost:8080/anotacao", {
            method: "PUT",
            headers: { 
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        })
        .then(() => {
            setListaAnotacao(prev => prev.filter(a => a.id !== id));
            setAnotacaoSelecionada(null);
            setIsOpen(false);
        })
        .catch(err => console.error(err));
    }

    return (
        <div className="h-full w-full space-y-1 flex flex-col">
            <div className="w-full h-fit bg-[#ffff] text-[#000] rounded-md shadow-md flex flex-col p-2">
                <h1 className="text-[#993399] font-semibold mb-1">Anotação</h1>
                <Input 
                    label='Titulo' 
                    type="text" 
                    className="w-full mb-2 rounded-md" 
                    placeholder="Digite o titulo da anotação" 
                    value={titulo} 
                    onChange={(e:any) => setTitulo(e.currentTarget.value)}
                />
                <Textarea 
                    label='Anotação' 
                    placeholder="Faça suas anotações" 
                    className="w-full rounded-md min-h-[100px]" 
                    value={anotacao} 
                    onChange={(e:any) => setAnotacao(e.currentTarget.value)}
                />
                <Button className="bg-[#993399] mt-2 w-[80px] ml-auto text-white" onClick={salvar}>Salvar</Button>
            </div>

            <div className="h-full w-full bg-[#ffff] rounded-md shadow-md pt-2 overflow-auto">
                <h1 className="text-[#993399] ml-2 mt-2 mb-2 font-semibold">Minhas Anotações</h1>
                <ul className="w-full px-2 h-fit text-black mx-auto overflow-auto space-y-1">
                    {listaAnotacao.map(a => (
                        <li key={a.id} className="bg-[#ebebeb] flex justify-between p-2 rounded-md items-center">
                            <p>{a.titulo}</p>
                            <Button 
                                className="p-2 bg-[#993399] rounded-md text-white" 
                                onClick={() => { setAnotacaoSelecionada(a); setIsOpen(true); }}
                            >
                                Visualizar
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>

            <Modal isOpen={isOpen} onClose={setIsOpen}>
                <ModalContent>
                    <ModalHeader>
                        <h1>{anotacaoSelecionada?.titulo}</h1>
                    </ModalHeader>
                    <ModalBody>
                        <p>{anotacaoSelecionada?.anotacao}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                            color="danger" 
                            onClick={() => anotacaoSelecionada && removerAnotacao(anotacaoSelecionada.id)}
                        >
                            Remover
                        </Button>
                        <Button onClick={() => setIsOpen(false)}>Fechar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}
