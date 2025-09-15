"use client"
import { useEffect, useState } from "react";
import { Button, Progress } from "@heroui/react";

export default function Home() {
    const [tarefas, setTarefas] = useState<any[]>([]);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    useEffect(() => {
        async function fetchTarefas() {
            if (!token) return; // se não tiver token, não chama API

            try {
                const res = await fetch("http://localhost:8080/usuario", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    setTarefas(data);
                } else {
                    console.error("Erro ao buscar tarefas");
                }
            } catch (err) {
                console.error("Erro de conexão:", err);
            }
        }

        fetchTarefas();
    }, [token]);

    return (
        <div className="flex flex-col h-full w-full space-y-2">
            <div className="h-full w-full flex flex-col bg-[#ffffff] rounded-md shadow-md">
                <h1 className="ml-2 mt-2 text-[#993399] font-semibold">Progresso</h1>
                <div className="h-full w-full px-3 flex justify-center items-center">
                    <Progress 
                        label="Progresso das tarefas" 
                        radius="md" 
                        showValueLabel={true} 
                        value={35} 
                        className="bg-[#993399] rounded-md p-10 text-white" 
                        classNames={{
                            track: "drop-shadow-lg border border-default",
                            indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                            label: "tracking-wider font-medium text-default-600",
                            value: "text-foreground/60",
                        }}
                    />
                </div>
            </div>
            <div className="h-full w-full bg-[#ffffff] rounded-md shadow-md px-3 overflow-y-auto">
                <div className="w-full h-fit">
                    <h1 className="ml-2 mt-2 text-[#993399] font-semibold">Tarefas Pendentes</h1>
                </div>
                <div className="h-full w-full overflow-y-auto">
                    <ul className="w-full h-[90%] overflow-y-auto p-2 text-[#993399]">
                        {tarefas.length > 0 ? (
                            tarefas.map((tarefa, i) => (
                                <li 
                                    key={i} 
                                    className="flex bg-slate-200 shadow-md justify-between items-center px-4 rounded p-2"
                                >
                                    {tarefa.nome} 
                                    <button className="px-5 py-1 rounded-md bg-[#993399] text-white">
                                        Visualizar
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-500">Nenhuma tarefa encontrada</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
