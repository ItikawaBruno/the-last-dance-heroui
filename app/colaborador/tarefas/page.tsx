'use client'

import { Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from "@heroui/react";
import { Button } from "@heroui/button";
import { useState, useEffect } from "react";

type Tarefa = {
    id: number;
    titulo: string;
    descricao: string;
    status: string;
    prazo: string;
}

export default function Tarefas() {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const [filtroTitulo, setFiltroTitulo] = useState("");
    const [filtroStatus, setFiltroStatus] = useState("todos");
    const [tarefaSelecionada, setTarefaSelecionada] = useState<Tarefa | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    // Pega token do localStorage
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) setToken(storedToken);
    }, []);

    // Buscar tarefas do backend
    useEffect(() => {
        if (!token) return;

        fetch("http://localhost:8080/usuario/listar/tarefas", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(res => res.json())
        .then((data: Tarefa[]) => setTarefas(data))
        .catch(err => console.error(err));
    }, [token]);

    // Filtragem
    const tarefasFiltradas = tarefas.filter(t => {
        const matchesTitulo = t.titulo.toLowerCase().includes(filtroTitulo.toLowerCase());
        const matchesStatus = filtroStatus === "todos" || t.status.toLowerCase() === filtroStatus.toLowerCase();
        return matchesTitulo && matchesStatus;
    });

    // Finalizar tarefa
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
            setTarefas(prev => prev.map(t => t.id === tarefaId ? { ...t, status: "FINALIZADO" } : t));
            setIsOpen(false);
            setTarefaSelecionada(null);
        })
        .catch(err => console.error(err));
    }

    return (
        <div className="h-full w-full flex flex-col space-y-2">
            <div className="w-full h-fit bg-[#ffffff] flex items-center p-2 rounded-md shadow-md">                
                <div className="w-full p-1 flex flex-col">
                    <label className="text-[#993399] font-bold">Tarefas</label>
                    <Input 
                        type="text" 
                        placeholder="Pesquise pelo título da tarefa" 
                        className="outline-[#993399] p-2 rounded-md text-black"
                        value={filtroTitulo}
                        onChange={(e) => setFiltroTitulo(e.target.value)}
                    />
                </div>
                <div className="w-full">
                    <Select 
                        label='Filtrar por status' 
                        labelPlacement='outside' 
                        value={filtroStatus}
                        onValueChange={(val) => setFiltroStatus(val)}
                    >
                        <SelectItem value='todos'>Todos</SelectItem>
                        <SelectItem value='pendente'>Pendente</SelectItem>
                        <SelectItem value='concluido'>Concluído</SelectItem>
                        <SelectItem value='finalizado'>Finalizado</SelectItem>
                    </Select>
                </div>
            </div>

            <div className="h-full w-full bg-[#ffffff] rounded-md shadow-md overflow-y-auto p-2">
                <h1 className="text-[#993399] font-bold">Minhas Tarefas</h1>
                <ul className="w-full overflow-y-auto flex flex-col mt-4 space-y-2">
                    {tarefasFiltradas.map(tarefa => (
                        <li key={tarefa.id} className="w-full bg-[#993399] p-2 text-white rounded-md shadow-md flex justify-between items-center px-6">
                            <p className="font-bold">{tarefa.titulo}</p>
                            <Button className="bg-[#df5ef0] px-4 p-1 rounded-md" onClick={() => {setIsOpen(true); setTarefaSelecionada(tarefa)}}>
                                Abrir
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>

            <Modal isOpen={isOpen} onClose={setIsOpen}>
                <ModalContent>
                    <ModalHeader className='flex flex-col'>
                        <h1>Título: {tarefaSelecionada?.titulo}</h1>
                        <h2>Prazo: {tarefaSelecionada?.prazo}</h2>
                        <h2>Status: {tarefaSelecionada?.status}</h2>
                    </ModalHeader>
                    <ModalBody>
                        <p>Descrição: {tarefaSelecionada?.descricao}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => tarefaSelecionada && finalizarTarefa(tarefaSelecionada.id)}>Finalizar</Button>
                        <Button onClick={() => setIsOpen(false)} color='danger'>Sair</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}
