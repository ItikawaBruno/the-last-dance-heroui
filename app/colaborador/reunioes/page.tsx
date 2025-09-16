"use client";

import { useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { CalendarDays, Video } from "lucide-react";

interface Reuniao {
  id: number;
  titulo: string;
  descricao: string;
  dataHora: string;
  status: "Pendente" | "Finalizada";
  link: string; // Novo campo para link do Teams
}

const reunioesMock: Reuniao[] = [
  {
    id: 1,
    titulo: "Reunião de Sprint",
    descricao: "Alinhamento semanal da equipe",
    dataHora: "2025-09-20T14:00",
    status: "Pendente",
    link: "https://teams.microsoft.com/l/meetup-join/123456789",
  },
  {
    id: 2,
    titulo: "Feedback com gestor",
    descricao: "Revisão de desempenho",
    dataHora: "2025-09-22T10:00",
    status: "Finalizada",
    link: "https://teams.microsoft.com/l/meetup-join/987654321",
  },
];

export default function ColaboradorReunioes() {
  const [reunioes] = useState<Reuniao[]>(reunioesMock);
  const [selectedReuniao, setSelectedReuniao] = useState<Reuniao | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const abrirModal = (reuniao: Reuniao) => {
    setSelectedReuniao(reuniao);
    setIsOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <CalendarDays className="w-6 h-6" /> Minhas Reuniões
      </h1>

      <div className="grid gap-4 md:grid-cols-2">
        {reunioes.map((reuniao) => (
          <Card key={reuniao.id} isPressable onPress={() => abrirModal(reuniao)}>
            <CardBody>
              <h2 className="text-lg font-semibold">{reuniao.titulo}</h2>
              <p className="text-sm text-gray-500">
                {new Date(reuniao.dataHora).toLocaleString("pt-BR")}
              </p>
              <p
                className={`mt-2 text-sm font-medium ${
                  reuniao.status === "Pendente" ? "text-orange-600" : "text-green-600"
                }`}
              >
                {reuniao.status}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {selectedReuniao?.titulo}
              </ModalHeader>
              <ModalBody>
                <p><strong>Descrição:</strong> {selectedReuniao?.descricao}</p>
                <p><strong>Data e Hora:</strong> {selectedReuniao && new Date(selectedReuniao.dataHora).toLocaleString("pt-BR")}</p>
                <p><strong>Status:</strong> {selectedReuniao?.status}</p>
              </ModalBody>
              <ModalFooter className="flex justify-between">
                <Button variant="light" onPress={onClose}>
                  Fechar
                </Button>
                {selectedReuniao?.status === "Pendente" && (
                  <Button
                    color="primary"
                    startContent={<Video className="w-4 h-4" />}
                    onPress={() => window.open(selectedReuniao.link, "_blank")}
                  >
                    Entrar na Reunião
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
