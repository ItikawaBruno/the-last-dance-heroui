'use client'

import { useState } from "react";
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

    // Criar nova anotação
    function salvar() {
        if (!titulo || !anotacao) return;
        const nova: Anotacao = {
            id: Date.now(),
            titulo,
            anotacao
        };
        setListaAnotacao(prev => [...prev, nova]);
        setTitulo('');
        setAnotacao('');
    }

    // Abrir modal para edição
    function abrirModal(a: Anotacao) {
        setAnotacaoSelecionada(a);
        setIsOpen(true);
    }

    // Atualizar anotação no modal
    function atualizarAnotacao() {
        if (!anotacaoSelecionada) return;
        setListaAnotacao(prev => prev.map(a => 
            a.id === anotacaoSelecionada.id ? anotacaoSelecionada : a
        ));
        setIsOpen(false);
        setAnotacaoSelecionada(null);
    }

    // Remover anotação
    function removerAnotacao() {
        if (!anotacaoSelecionada) return;
        setListaAnotacao(prev => prev.filter(a => a.id !== anotacaoSelecionada.id));
        setIsOpen(false);
        setAnotacaoSelecionada(null);
    }

    return (
        <div className="h-full w-full space-y-2 flex flex-col">
            {/* Criar nova anotação */}
            <div className="w-full h-fit bg-[#ffff] text-[#000] rounded-md shadow-md flex flex-col p-2">
                <h1 className="text-[#993399] font-semibold mb-1">Nova Anotação</h1>
                <Input 
                    label='Título' 
                    type="text" 
                    className="w-full mb-2 rounded-md" 
                    placeholder="Digite o título da anotação" 
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
                <Button 
                    className="bg-[#993399] mt-2 w-[80px] ml-auto text-white" 
                    onClick={salvar}
                >
                    Salvar
                </Button>
            </div>

            {/* Lista de anotações */}
            <div className="h-full w-full bg-[#ffff] rounded-md shadow-md pt-2 overflow-auto">
                <h1 className="text-[#993399] ml-2 mt-2 mb-2 font-semibold">Minhas Anotações</h1>
                <ul className="w-full px-2 h-fit text-black mx-auto overflow-auto space-y-1">
                    {listaAnotacao.map(a => (
                        <li key={a.id} className="bg-[#ebebeb] flex justify-between p-2 rounded-md items-center">
                            <p>{a.titulo}</p>
                            <Button 
                                className="p-2 bg-[#993399] rounded-md text-white" 
                                onClick={() => abrirModal(a)}
                            >
                                Visualizar
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Modal */}
            <Modal isOpen={isOpen} onClose={setIsOpen}>
                <ModalContent>
                    <ModalHeader>
                        <Input 
                            value={anotacaoSelecionada?.titulo || ''} 
                            onChange={(e:any) => anotacaoSelecionada && setAnotacaoSelecionada({...anotacaoSelecionada, titulo: e.currentTarget.value})}
                            placeholder="Título"
                        />
                    </ModalHeader>
                    <ModalBody>
                        <Textarea 
                            value={anotacaoSelecionada?.anotacao || ''} 
                            onChange={(e:any) => anotacaoSelecionada && setAnotacaoSelecionada({...anotacaoSelecionada, anotacao: e.currentTarget.value})}
                            placeholder="Anotação"
                        />
                    </ModalBody>
                    <ModalFooter className="flex justify-between">
                        <Button color="danger" onClick={removerAnotacao}>Remover</Button>
                        <Button onClick={atualizarAnotacao}>Salvar</Button>
                        <Button onClick={() => setIsOpen(false)}>Fechar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}
