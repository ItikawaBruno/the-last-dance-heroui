"use client"
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Progress } from "@heroui/react";
import { useState } from "react";

type TarefaAPI = {
    id: number;
    titulo: string;
    descricao: string;
    status: string;
    prazo: string;
}

type ColaboradorDTO = {
    nome: string;
    total: number;
    tarefas: TarefaAPI[];
}

export default function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const [tarefaSelecionada, setTarefaSelecionada] = useState<TarefaAPI | null>(null);

    // 🔹 MOCK: dados fixos (sem backend)
    const mockData: ColaboradorDTO = {
        nome: "João Silva",
        total: 60,
        tarefas: [
            { id: 1, titulo: "Criar layout", descricao: "Montar layout inicial no Figma", status: "Pendente", prazo: "20/09/2025" },
            { id: 2, titulo: "Implementar API", descricao: "Desenvolver endpoints REST", status: "Pendente", prazo: "25/09/2025" },
            { id: 3, titulo: "Testes unitários", descricao: "Cobrir serviços principais com testes", status: "Pendente", prazo: "28/09/2025" }
        ]
    };

    const [tarefas, setTarefas] = useState<TarefaAPI[]>(mockData.tarefas);
    const [progresso, setProgresso] = useState<number>(mockData.total);
    const [nomeUsuario] = useState<string>(mockData.nome);

    function finalizarTarefa(tarefaId: number) {
        setTarefas(prev => prev.filter(t => t.id !== tarefaId));
        setTarefaSelecionada(null);
        setProgresso(prev => Math.min(prev + 10, 100));
    }

    return (
        <div className="flex flex-col h-full w-full space-y-2">

            {/* Seção "Olá, Nome" */}
            <div className="h-fit w-full flex items-center px-4 py-4 bg-[#ffffff] rounded-md shadow-md">
                <h1 className="text-[#993399] font-semibold text-lg">Olá, {nomeUsuario}</h1>
            </div>

            {/* Progresso */}
            <div className="h-fit w-full flex flex-col bg-[#ffffff] rounded-md shadow-md">
                <div className="h-full w-full px-3 py-4 flex justify-center items-center">
                    <Progress 
                        label="Progresso do Onboarding" 
                        radius="md" 
                        showValueLabel={true} 
                        value={progresso} 
                        className="bg-[#993399] rounded-md p-10 text-white" 
                        classNames={{
                            track: "drop-shadow-lg border border-default",
                            indicator: "bg-gradient-to-r from-yellow-300 to-green-500",
                            label: "tracking-wider font-medium text-white",
                            value: "text-white",
                        }}
                    />
                </div>
            </div>

            {/* Lista de tarefas */}
            <div className="h-full w-full bg-[#ffffff] rounded-md shadow-md px-3 overflow-y-auto">
                <div className="w-full h-fit">
                    <h1 className="ml-2 mt-2 text-[#993399] font-semibold">Tarefas Pendentes</h1>
                </div>
                <div className="h-full w-full">
                    <ul className="w-full h-[90%] overflow-y-auto p-2 text-[#993399] space-y-2">
                        {tarefas.map((tarefa) => (
                            <li key={tarefa.id} className="flex bg-slate-200 shadow-md justify-between items-center px-4 rounded p-2">
                                {tarefa.titulo} 
                                <Button 
                                    className="px-5 py-1 rounded-md bg-[#993399] text-white" 
                                    onClick={() => {
                                        setIsOpen(true);
                                        setTarefaSelecionada(tarefa);
                                    }}
                                >
                                    Visualizar
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Modal */}
                <Modal isOpen={isOpen} onOpenChange={setIsOpen} className='text-[#993399]'>
                    <ModalContent>
                        <ModalHeader>
                            <h1>Detalhes da Tarefa</h1>
                        </ModalHeader>
                        <ModalBody>
                            {tarefaSelecionada && (
                                <>
                                    <h2 className="font-bold">{tarefaSelecionada.titulo}</h2>
                                    <p><strong>Prazo:</strong> {tarefaSelecionada.prazo}</p>
                                    <p><strong>Descrição:</strong> {tarefaSelecionada.descricao}</p>
                                </>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button 
                                onClick={() => tarefaSelecionada && finalizarTarefa(tarefaSelecionada.id)} 
                                className="bg-[#993399] text-white"
                            >
                                Finalizar
                            </Button>
                            <Button onClick={() => setIsOpen(false)} color='danger'>Fechar</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        </div>
    );
}
