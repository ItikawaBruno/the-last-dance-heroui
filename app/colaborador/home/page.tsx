"use client"
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Progress } from "@heroui/react";
import { useState, useEffect } from "react";

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
    const [tarefas, setTarefas] = useState<TarefaAPI[]>([]);
    const [progresso, setProgresso] = useState<number>(0);
    const [nomeUsuario, setNomeUsuario] = useState<string>("");
    const [token, setToken] = useState<string | null>(null);

    // Pegar token do localStorage apenas no cliente
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) setToken(storedToken);
    }, []);

    // Buscar dados do usuário e tarefas
    useEffect(() => {
        if (!token) return;

        fetch("http://localhost:8080/api/usuario", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(res => res.json())
        .then((data: ColaboradorDTO) => {
            setTarefas(data.tarefas);
            setProgresso(data.total);
            setNomeUsuario(data.nome);
        })
        .catch(err => console.error(err));
    }, [token]);

    function finalizarTarefa(tarefaId: number) {
        if (!token) return;

        fetch("http://localhost:8080/usuario/atualizar/finalizado", {
            method: "PUT",
            headers: { 
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: tarefaId })
        })
        .then(() => {
            setTarefas(prev => prev.filter(t => t.id !== tarefaId));
            setTarefaSelecionada(null);
        })
        .catch(err => console.error(err));
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
                        label="Progresso das tarefas" 
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
                                    <h2>Título: {tarefaSelecionada.titulo}</h2>
                                    <p><strong>Descrição:</strong> {tarefaSelecionada.descricao}</p>
                                    <p><strong>Prazo:</strong> {tarefaSelecionada.prazo}</p>
                                    <p><strong>Status:</strong> {tarefaSelecionada.status}</p>
                                </>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button 
                                onClick={() => tarefaSelecionada && finalizarTarefa(tarefaSelecionada.id)} 
                                color='secondary'
                            >
                                Finalizar
                            </Button>
                            <Button onClick={() => setIsOpen(false)} color='danger'>Sair</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        </div>
    );
}
