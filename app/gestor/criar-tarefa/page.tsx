'use client'

import { useState } from "react";
import { Input, Textarea, Select, SelectItem } from "@heroui/react";
import { Button } from "@heroui/button";

type Tarefa = {
    id: number;
    titulo: string;
    descricao: string;
    prazo: string;
    colaboradorEmail: string;
}

type Colaborador = {
    nome: string;
    email: string;
}

export default function CriarTarefa() {
    // Mock de colaboradores
    const colaboradores: Colaborador[] = [
        { nome: "João Silva", email: "joao@email.com" },
        { nome: "Maria Souza", email: "maria@email.com" },
        { nome: "Carlos Pereira", email: "carlos@email.com" }
    ];

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [prazo, setPrazo] = useState('');
    const [colaboradorEmail, setColaboradorEmail] = useState(colaboradores[0].email);
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);

    function salvarTarefa() {
        if (!titulo || !descricao || !prazo || !colaboradorEmail) {
            alert("Preencha todos os campos!");
            return;
        }

        const novaTarefa: Tarefa = {
            id: Date.now(),
            titulo,
            descricao,
            prazo,
            colaboradorEmail
        };

        setTarefas(prev => [...prev, novaTarefa]);
        setTitulo('');
        setDescricao('');
        setPrazo('');
        setColaboradorEmail(colaboradores[0].email);
    }

    return (
        <div className="h-full w-full flex flex-col p-4 space-y-4">
            <h1 className="text-[#993399] font-bold text-2xl">Criar Tarefa</h1>

            <div className="bg-white p-4 rounded-md shadow-md flex flex-col gap-4">
                <Input
                    label="Título"
                    placeholder="Digite o título da tarefa"
                    value={titulo}
                    onChange={e => setTitulo(e.currentTarget.value)}
                />

                <Textarea
                    label="Descrição"
                    placeholder="Digite a descrição da tarefa"
                    value={descricao}
                    onChange={e => setDescricao(e.currentTarget.value)}
                />

                <Input
                    label="Prazo"
                    type="date"
                    value={prazo}
                    onChange={e => setPrazo(e.currentTarget.value)}
                />

                <Select
                    key={`select-${colaboradorEmail}`}
                    label="Colaborador"
                    selectedKeys={new Set([colaboradorEmail])}
                    onSelectionChange={(value) => {
                        const selected = Array.from(value)[0] as string;
                        setColaboradorEmail(selected);
                    }}
                >
                    {colaboradores.map(c => (
                        <SelectItem key={c.email} value={c.email}>{c.email}</SelectItem>
                    ))}
                </Select>

                <Button
                    className="bg-[#993399] text-white w-[120px] mt-2"
                    onClick={salvarTarefa}
                >
                    Salvar
                </Button>
            </div>

            {/* Lista de tarefas criadas */}
            <div className="bg-white p-4 rounded-md shadow-md flex flex-col gap-2">
                <h2 className="text-[#993399] font-semibold">Tarefas Criadas</h2>
                <ul className="space-y-2">
                    {tarefas.map(t => (
                        <li key={t.id} className="p-2 bg-gray-100 rounded-md flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{t.titulo}</p>
                                <p className="text-sm">Prazo: {t.prazo}</p>
                                <p className="text-sm">Colaborador: {t.colaboradorEmail}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
