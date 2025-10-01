'use client'

import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

type Status = "PENDENTE" | "FINALIZADO" | "CONCLUIDO";

type Tarefa = {
    id: number;
    titulo: string;
    status: Status;
    nota?: number;
};

type Colaborador = {
    id: number;
    nome: string;
    tarefas: Tarefa[];
};

export default function GestorHome() {
    // Dados mockados dos colaboradores
    const colaboradoresMock: Colaborador[] = [
        {
            id: 1,
            nome: "João Silva",
            tarefas: [
                { id: 1, titulo: "Enviar relatório mensal", status: "PENDENTE" },
                { id: 2, titulo: "Atualizar planilha de vendas", status: "FINALIZADO" },
                { id: 3, titulo: "Organizar arquivos", status: "PENDENTE" },
                { id: 4, titulo: "Reunião com equipe", status: "FINALIZADO" },
                { id: 5, titulo: "Preparar material de treinamento", status: "CONCLUIDO", nota: 9 }
            ]
        },
        {
            id: 2,
            nome: "Maria Souza",
            tarefas: [
                { id: 6, titulo: "Revisar documentação", status: "PENDENTE" },
                { id: 7, titulo: "Finalizar apresentação do projeto", status: "FINALIZADO" },
                { id: 8, titulo: "Criar cronograma de atividades", status: "PENDENTE" },
                { id: 9, titulo: "Atender cliente X", status: "FINALIZADO" },
                { id: 10, titulo: "Relatório financeiro", status: "CONCLUIDO", nota: 10 }
            ]
        },
        {
            id: 3,
            nome: "Carlos Pereira",
            tarefas: [
                { id: 11, titulo: "Enviar e-mails pendentes", status: "PENDENTE" },
                { id: 12, titulo: "Atualizar site institucional", status: "FINALIZADO" },
                { id: 13, titulo: "Backup do servidor", status: "PENDENTE" },
                { id: 14, titulo: "Revisar código do sistema", status: "FINALIZADO" },
                { id: 15, titulo: "Configurar ambiente de testes", status: "CONCLUIDO", nota: 8 }
            ]
        }
    ];

    const [colaboradores, setColaboradores] = useState<Colaborador[]>(colaboradoresMock);
    const [modalAberto, setModalAberto] = useState(false);
    const [colaboradorSelecionado, setColaboradorSelecionado] = useState<Colaborador | null>(null);
    const [notaDigitada, setNotaDigitada] = useState<Record<number, number>>({});

    function abrirModal(colaborador: Colaborador) {
        setColaboradorSelecionado(colaborador);
        setModalAberto(true);
    }

    function darNota(tarefaId: number, nota: number) {
        if (!colaboradorSelecionado) return;

        const novosColaboradores = colaboradores.map(colab => {
            if (colab.id === colaboradorSelecionado.id) {
                return {
                    ...colab,
                    tarefas: colab.tarefas.map(t =>
                        t.id === tarefaId
                            ? { ...t, status: "CONCLUIDO", nota }
                            : t
                    )
                };
            }
            return colab;
        });

        setColaboradores(novosColaboradores);

        setColaboradorSelecionado(novosColaboradores.find(c => c.id === colaboradorSelecionado.id) || null);

        setNotaDigitada(prev => {
            const novo = { ...prev };
            delete novo[tarefaId];
            return novo;
        });
    }

    return (
        <div className="w-full flex flex-col bg-white p-6 rounded-lg shadow-md h-full">
            {/* Saudação do Gestor */}
            <h1 className="text-xl font-bold text-[#333] mb-6">
                Olá, Pedro Santos
            </h1>

            <div className="h-full w-full flex flex-col space-y-4">
                <h2 className="text-[#993399] font-bold text-2xl mb-4">Colaboradores</h2>

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
                            <div className="flex flex-col space-y-4">
                                {/* Pendentes */}
                                <div>
                                    <h2 className="font-semibold text-[#993399]">Pendentes:</h2>
                                    <ul className="list-disc list-inside">
                                        {colaboradorSelecionado?.tarefas
                                            .filter(t => t.status === "PENDENTE")
                                            .map(t => (
                                                <li key={t.id}>{t.titulo}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Finalizadas (avaliar) */}
                                <div>
                                    <h2 className="font-semibold text-[#993399]">Finalizadas (aguardando nota):</h2>
                                    <ul className="space-y-2">
                                        {colaboradorSelecionado?.tarefas
                                            .filter(t => t.status === "FINALIZADO")
                                            .map(t => (
                                                <li key={t.id} className="flex items-center space-x-2">
                                                    <span>{t.titulo}</span>
                                                    <Input
                                                        type="number"
                                                        min={0}
                                                        max={10}
                                                        placeholder="Nota"
                                                        value={notaDigitada[t.id]?.toString() || ""}
                                                        onChange={(e) =>
                                                            setNotaDigitada(prev => ({
                                                                ...prev,
                                                                [t.id]: Number(e.target.value)
                                                            }))
                                                        }
                                                        className="w-20"
                                                    />
                                                    <Button
                                                        size="sm"
                                                        className="bg-[#28a745] text-white"
                                                        onClick={() => darNota(t.id, notaDigitada[t.id] || 0)}
                                                    >
                                                        Dar Nota
                                                    </Button>
                                                </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Concluídas */}
                                <div>
                                    <h2 className="font-semibold text-[#993399]">Concluídas:</h2>
                                    <ul className="list-disc list-inside">
                                        {colaboradorSelecionado?.tarefas
                                            .filter(t => t.status === "CONCLUIDO")
                                            .map(t => (
                                                <li key={t.id}>
                                                    {t.titulo} - Nota: <b>{t.nota}</b>
                                                </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={() => setModalAberto(false)}>Fechar</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        </div>
    );
}
