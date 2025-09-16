'use client'

import { useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";

type Documento = {
    id: number;
    nome: string;
    arquivo: File;
};

export default function Documentos() {
    const [documentos, setDocumentos] = useState<Documento[]>([]);
    const [documentoSelecionado, setDocumentoSelecionado] = useState<Documento | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [novoNome, setNovoNome] = useState("");

    // Adicionar documento (mock)
    function adicionarDocumento(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return;
        const file = e.target.files[0];
        const novoDoc: Documento = {
            id: Date.now(),
            nome: file.name,
            arquivo: file
        };
        setDocumentos(prev => [...prev, novoDoc]);
        e.target.value = ""; // limpa o input
    }

    // Abrir modal para edição/visualização
    function abrirModal(doc: Documento) {
        setDocumentoSelecionado(doc);
        setNovoNome(doc.nome);
        setIsOpen(true);
    }

    // Salvar alteração de nome
    function salvarEdicao() {
        if (!documentoSelecionado) return;
        setDocumentos(prev => prev.map(d => d.id === documentoSelecionado.id ? { ...d, nome: novoNome } : d));
        setIsOpen(false);
        setDocumentoSelecionado(null);
    }

    // Remover documento
    function removerDocumento() {
        if (!documentoSelecionado) return;
        setDocumentos(prev => prev.filter(d => d.id !== documentoSelecionado.id));
        setIsOpen(false);
        setDocumentoSelecionado(null);
    }

    return (
        <div className="h-full w-full flex flex-col space-y-4 p-2">
            {/* Upload */}
            <div className="w-full bg-white p-4 rounded-md shadow-md flex items-center gap-4">
                <Input type="file" onChange={adicionarDocumento} className="w-full" />
            </div>

            {/* Lista de documentos */}
            <div className="w-full h-full bg-white p-2 rounded-md shadow-md overflow-auto">
                <h1 className="text-[#993399] font-semibold mb-2">Meus Documentos</h1>
                <ul className="space-y-2">
                    {documentos.map(doc => (
                        <li key={doc.id} className="flex justify-between items-center bg-[#ebebeb] p-2 rounded-md">
                            <p className="truncate max-w-[70%]">{doc.nome}</p>
                            <Button 
                                className="bg-[#993399] text-white px-4 py-1 rounded-md"
                                onClick={() => abrirModal(doc)}
                            >
                                Abrir
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Modal */}
            <Modal isOpen={isOpen} onClose={setIsOpen}>
                <ModalContent>
                    <ModalHeader>
                        <h1>Editar Documento</h1>
                    </ModalHeader>
                    <ModalBody className="flex flex-col gap-2">
                        <label className="font-semibold">Nome do documento:</label>
                        <Input 
                            value={novoNome} 
                            onChange={e => setNovoNome(e.currentTarget.value)}
                        />
                        {documentoSelecionado && (
                            <p className="text-sm text-gray-600">Arquivo: {documentoSelecionado.arquivo.name}</p>
                        )}
                    </ModalBody>
                    <ModalFooter className="flex gap-2">
                        <Button onClick={salvarEdicao} className="bg-[#28a745] text-white">Salvar</Button>
                        <Button onClick={removerDocumento} color="danger">Remover</Button>
                        <Button onClick={() => setIsOpen(false)}>Fechar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}
