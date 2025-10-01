'use client'

import { useState } from "react";
import { Input, Textarea, Select, SelectItem } from "@heroui/react";
import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";

type Reuniao = {
  id: number;
  titulo: string;
  descricao: string;
  dataHora: string;
  convidado: string;
}

// Mock de colaboradores
const colaboradores = [
  { nome: "João Silva", email: "joao@email.com" },
  { nome: "Maria Souza", email: "maria@email.com" },
  { nome: "Carlos Pereira", email: "carlos@email.com" }
];

export default function CriarReuniao() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataHora, setDataHora] = useState('');
  const [convidado, setConvidado] = useState('');
  const [reunioes, setReunioes] = useState<Reuniao[]>([]);
  const [modalReuniao, setModalReuniao] = useState<Reuniao | null>(null);

  function salvarReuniao() {
    if (!titulo || !descricao || !dataHora || !convidado) {
      alert("Preencha todos os campos!");
      return;
    }

    const nova: Reuniao = {
      id: Date.now(),
      titulo,
      descricao,
      dataHora,
      convidado
    };

    setReunioes(prev => [...prev, nova]);

    // Reset campos
    setTitulo('');
    setDescricao('');
    setDataHora('');
    setConvidado('');
  }

  function removerReuniao(id: number) {
    setReunioes(prev => prev.filter(r => r.id !== id));
    setModalReuniao(null);
  }

  return (
    <div className="h-full w-full p-4 flex flex-col space-y-4">
      <h1 className="text-[#993399] font-bold text-2xl">Criar Reunião</h1>

      {/* Formulário */}
      <div className="bg-white p-4 rounded-md shadow-md flex flex-col gap-4">
        <Input
          label="Título"
          placeholder="Digite o título da reunião"
          labelPlacement="outside-left"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
        />

        <Textarea
          label="Descrição"
          placeholder="Digite a descrição da reunião"
          labelPlacement="outside-left"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        />

        <Input
          label="Data e Hora"
          type="datetime-local"
          value={dataHora}
          labelPlacement="outside-left"
          onChange={e => setDataHora(e.target.value)}
        />

        <Select
          label="Convidado"
          placeholder="Selecione um colaborador"
          selectedKeys={convidado ? [convidado] : []}
          labelPlacement="outside-left"
          onSelectionChange={(keys) => {
            const selected = Array.from(keys)[0] as string;
            setConvidado(selected || '');
          }}
        >
          {colaboradores.map(c => (
            <SelectItem key={c.email} value={c.email}>
              {c.nome} ({c.email})
            </SelectItem>
          ))}
        </Select>

          <Input type="file"></Input>

        <Button className="bg-[#993399] text-white w-[120px]" onClick={salvarReuniao}>Salvar</Button>
      </div>

      {/* Lista de reuniões */}
      <div className="bg-white p-4 rounded-md shadow-md flex flex-col gap-2 h-full">
        <h2 className="text-[#993399] font-semibold">Reuniões Criadas</h2>
        <ul className="space-y-2">
          {reunioes.map(r => (
            <li key={r.id} className="p-2 bg-gray-100 rounded-md flex justify-between items-center">
              <div>
                <p className="font-semibold">{r.titulo}</p>
                <p className="text-sm">Data: {r.dataHora}</p>
                <p className="text-sm">Convidado: {r.convidado}</p>
              </div>
              <Button className="bg-[#993399] text-white" onClick={() => setModalReuniao(r)}>Abrir</Button>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      <Modal isOpen={!!modalReuniao} onClose={() => setModalReuniao(null)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1>{modalReuniao?.titulo}</h1>
                <p className="text-sm text-gray-600">{modalReuniao?.dataHora}</p>
                <p className="text-sm text-gray-600">Convidado: {modalReuniao?.convidado}</p>
              </ModalHeader>
              <ModalBody>
                <p>{modalReuniao?.descricao}</p>
              </ModalBody>
              <ModalFooter className="flex gap-2">
                <Button color="danger" onClick={() => modalReuniao && removerReuniao(modalReuniao.id)}>
                  Remover
                </Button>
                <Button onClick={onClose}>
                  Fechar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}