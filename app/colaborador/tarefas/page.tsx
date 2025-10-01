'use client'

import { Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { Button } from "@heroui/button";
import { useState, useEffect } from "react";

type Tarefa = {
  id: number;
  titulo: string;
  descricao: string;
  status: string; // "pendente" | "concluido" | "finalizado"
  prazo: string;
  nota?: number; // opcional, só para "concluido"
}

export default function Tarefas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [filtroTitulo, setFiltroTitulo] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [tarefaSelecionada, setTarefaSelecionada] = useState<Tarefa | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // mock inicial
  useEffect(() => {
    const tarefasMock: Tarefa[] = [
      { id: 1, titulo: "Estudar React", descricao: "Estudar hooks e context API", status: "pendente", prazo: "2025-09-20" },
      { id: 2, titulo: "API Java", descricao: "Finalizar autenticação JWT", status: "concluido", prazo: "2025-09-18", nota: 8.5 },
      { id: 3, titulo: "Revisar banco", descricao: "Checar migrations e constraints", status: "finalizado", prazo: "2025-09-25" },
      { id: 4, titulo: "Estudar AI", descricao: "Testar modelos de machine learning", status: "pendente", prazo: "2025-09-30" },
      { id: 5, titulo: "Projeto Frontend", descricao: "Finalizar dashboard de tarefas", status: "pendente", prazo: "2025-10-02" },
      { id: 6, titulo: "Documentação", descricao: "Escrever guia de instalação", status: "concluido", prazo: "2025-09-15", nota: 9.0 },
    ];
    setTarefas(tarefasMock);
  }, []);

  // filtragem (case-insensitive)
  const tarefasFiltradas = tarefas.filter(t => {
    const matchesTitulo = t.titulo.toLowerCase().includes(filtroTitulo.toLowerCase());
    const matchesStatus = filtroStatus === "todos" || t.status.toLowerCase() === filtroStatus.toLowerCase();
    return matchesTitulo && matchesStatus;
  });

  // finalizar (só muda se estiver pendente)
  function finalizarTarefa(tarefaId: number) {
    setTarefas(prev =>
      prev.map(t =>
        t.id === tarefaId && t.status === "pendente" ? { ...t, status: "finalizado" } : t
      )
    );
    setIsOpen(false);
    setTarefaSelecionada(null);
  }

  // helper para badge de status
  function statusBadge(status: string) {
    const s = status.toLowerCase();
    if (s === "pendente") return "bg-yellow-300 text-black px-2 py-0.5 rounded text-sm";
    if (s === "concluido") return "bg-green-500 text-white px-2 py-0.5 rounded text-sm";
    return "bg-blue-400 text-white px-2 py-0.5 rounded text-sm"; // finalizado
  }

  return (
    <div className="h-full w-full flex flex-col space-y-4 p-2">
      {/* Busca e filtro */}
      <div className="w-full h-fit bg-white flex items-center gap-4 p-3 rounded-md shadow-md">
        <div className="flex-1">
          <label className="text-[#993399] font-bold block mb-1">Pesquisar Tarefas</label>
          <Input
            type="text"
            placeholder="Digite o título da tarefa"
            className="outline-[#993399] p-2 rounded-md text-black"
            value={filtroTitulo}
            onChange={(e) => setFiltroTitulo(e.target.value)}
          />
        </div>

        {/* select nativo (mais confiável) */}
        <div className="w-48">
          <label className="text-[#993399] font-bold block mb-1">Filtrar por status</label>
          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-200 text-black"
          >
            <option value="todos">Todos</option>
            <option value="pendente">Pendente</option>
            <option value="concluido">Concluído</option>
            <option value="finalizado">Finalizado</option>
          </select>
        </div>
      </div>

      {/* Lista */}
      <div className="h-full w-full flex flex-col bg-white rounded-md shadow-md overflow-y-auto p-3">
        <h1 className="text-[#993399] font-bold mb-3">Minhas Tarefas</h1>
        <ul className="flex flex-col gap-3">
          {tarefasFiltradas.length === 0 ? (
            <li className="text-gray-500">Nenhuma tarefa encontrada</li>
          ) : (
            tarefasFiltradas.map(tarefa => (
              <li
                key={tarefa.id}
                className="w-full bg-[#993399] p-3 text-white rounded-md shadow-md flex justify-between items-center"
              >
                <div>
                  <p className="font-bold text-lg">{tarefa.titulo}</p>
                  <p className="text-sm">Prazo: {tarefa.prazo}</p>
                  <div className="mt-1">
                    <span className={statusBadge(tarefa.status)}>{tarefa.status}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    className="bg-white text-[#993399] px-4 py-1 rounded-md"
                    onClick={() => { setIsOpen(true); setTarefaSelecionada(tarefa); }}
                  >
                    Abrir
                  </Button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h2 className="text-xl font-bold">Título: {tarefaSelecionada?.titulo}</h2>
            <div className="flex gap-2 items-center">
              <span className="text-sm text-gray-600">Prazo: {tarefaSelecionada?.prazo}</span>
              <span className={tarefaSelecionada ? statusBadge(tarefaSelecionada.status) : ""}>
                {tarefaSelecionada?.status}
              </span>
            </div>
            {/* se for concluído mostrar nota */}
            {tarefaSelecionada?.status === "concluido" && (
              <div className="mt-1">
                <strong>Nota:</strong> {tarefaSelecionada?.nota ?? "-"}
              </div>
            )}
          </ModalHeader>

          <ModalBody>
            <p className="text-gray-700">Descrição: {tarefaSelecionada?.descricao}</p>
          </ModalBody>

          <ModalFooter className="flex gap-2">
            {tarefaSelecionada?.status === "pendente" && (
              <Button
                onClick={() => tarefaSelecionada && finalizarTarefa(tarefaSelecionada.id)}
                className="bg-green-500 text-white"
              >
                Finalizar
              </Button>
            )}
            <Button onClick={() => setIsOpen(false)} color="danger">Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
