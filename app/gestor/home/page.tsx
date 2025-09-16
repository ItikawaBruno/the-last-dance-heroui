'use client'

import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { Button } from "@heroui/button";

type Tarefa = {
    id: number;
    titulo: string;
    status: "PENDENTE" | "FINALIZADO";
}

type Colaborador = {
    id: number;
    nome: string;
    tarefas: Tarefa[];
}

export default function GestorHome() {
    // Dados mockados dos colaboradores
    const colaboradoresMock: Colaborador[] = [
        {
            id: 1,
            nome: "João Silva",
            tarefas: [
                { id: 1, titulo: "Enviar relatório", status: "PENDENTE" },
                { id: 2, titulo: "Atualizar planilha", status: "FINALIZADO" }
            ]
        },
        {
            id: 2,
            nome: "Maria Souza",
            tarefas: [
                { id: 3, titulo: "Revisar documentação", status: "PENDENTE" },
                { id: 4, titulo: "Finalizar apresentação", status: "FINALIZADO" }
            ]
        },
        {
            id: 3,
            nome: "Carlos Pereira",
            tarefas: [
                { id: 5, titulo: "Enviar e-mails", status: "PENDENTE" }
            ]
        }
    ];

    const [colaboradores] = useState<Colaborador[]>(colaboradoresMock);
    const [modalAberto, setModalAberto] = useState(false);
    const [colaboradorSelecionado, setColaboradorSelecionado] = useState<Colaborador | null>(null);

    function abrirModal(colaborador: Colaborador) {
        setColaboradorSelecionado(colaborador);
        setModalAberto(true);
    }

    return (
        <div className="h-full w-full flex flex-col p-4 space-y-4">
            <h1 className="text-[#993399] font-bold text-2xl mb-4">Colaboradores</h1>

            <ul className="space-y-2">
                {colaboradores.map(colab => (
                    <li 
                        key={colab.id} 
                        className="flex justify-between items-center bg-[#ebebeb] p-3 rounded-md shadow-md"
                    >
                        <span className="font-semibold text-[#333]">{colab.nome}</span>
                        <Button 
                            className="bg-[#993399] text-white px-4 py-1 rounded-md"
                            onClick={() => abrirModal(colab)}
                        >
                            Ver Tarefas
                        </Button>
                    </li>
                ))}
            </ul>

            {/* Modal de tarefas */}
            <Modal isOpen={modalAberto} onClose={setModalAberto}>
                <ModalContent>
                    <ModalHeader>
                        <h1>Tarefas de {colaboradorSelecionado?.nome}</h1>
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col space-y-2">
                            <h2 className="font-semibold text-[#993399]">Pendentes:</h2>
                            <ul className="list-disc list-inside">
                                {colaboradorSelecionado?.tarefas
                                    .filter(t => t.status === "PENDENTE")
                                    .map(t => (
                                        <li key={t.id}>{t.titulo}</li>
                                ))}
                            </ul>

                            <h2 className="font-semibold text-[#993399] mt-4">Finalizadas:</h2>
                            <ul className="list-disc list-inside">
                                {colaboradorSelecionado?.tarefas
                                    .filter(t => t.status === "FINALIZADO")
                                    .map(t => (
                                        <li key={t.id}>{t.titulo}</li>
                                ))}
                            </ul>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => setModalAberto(false)}>Fechar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}
