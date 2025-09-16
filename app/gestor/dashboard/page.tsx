'use client'
import { useState } from "react";
import { Select, SelectItem } from "@heroui/react";
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from '@nivo/line';

const colaboradores = [
  { nome: "João Silva", id: "joao" },
  { nome: "Maria Souza", id: "maria" },
  { nome: "Carlos Pereira", id: "carlos" }
];

const dadosDashboard: Record<string, { total: number; pie: any[]; line: any[] }> = {
  joao: {
    total: 15,
    pie: [
      { id: "pendentes", label: "Pendentes", value: 5 },
      { id: "finalizadas", label: "Finalizadas", value: 4 },
      { id: "concluidas", label: "Concluídas", value: 6 }
    ],
    line: [
      { id: "tarefas", data: [
        { x: "Seg", y: 2 }, { x: "Ter", y: 4 }, { x: "Qua", y: 3 }, 
        { x: "Qui", y: 3 }, { x: "Sex", y: 3 }
      ] }
    ]
  },
  maria: {
    total: 18,
    pie: [
      { id: "pendentes", label: "Pendentes", value: 6 },
      { id: "finalizadas", label: "Finalizadas", value: 5 },
      { id: "concluidas", label: "Concluídas", value: 7 }
    ],
    line: [
      { id: "tarefas", data: [
        { x: "Seg", y: 3 }, { x: "Ter", y: 5 }, { x: "Qua", y: 4 }, 
        { x: "Qui", y: 3 }, { x: "Sex", y: 3 }
      ] }
    ]
  },
  carlos: {
    total: 20,
    pie: [
      { id: "pendentes", label: "Pendentes", value: 7 },
      { id: "finalizadas", label: "Finalizadas", value: 6 },
      { id: "concluidas", label: "Concluídas", value: 7 }
    ],
    line: [
      { id: "tarefas", data: [
        { x: "Seg", y: 4 }, { x: "Ter", y: 5 }, { x: "Qua", y: 4 }, 
        { x: "Qui", y: 4 }, { x: "Sex", y: 3 }
      ] }
    ]
  }
};

export default function Dashboard() {
  const [colaborador, setColaborador] = useState("joao");
  const { total, pie, line } = dadosDashboard[colaborador];

  return (
    <div className="h-full w-full p-4 flex flex-col space-y-4">
      <h1 className="text-[#993399] font-bold text-2xl mb-2">Dashboard</h1>
      
      {/* Select do colaborador */}
      <div className="w-[250px] mb-4">
        <Select
          key={colaborador}
          label="Colaborador"
          placeholder="Selecione um colaborador"
          defaultSelectedKeys={[colaborador]}
          onSelectionChange={(keys) => {
            const selected = Array.from(keys)[0] as string;
            setColaborador(selected || 'joao');
          }}
          className="z-10"
        >
          {colaboradores.map(c => (
            <SelectItem key={c.id} value={c.id}>{c.nome}</SelectItem>
          ))}
        </Select>
      </div>

      <div className="flex space-x-4 h-[300px]">
        <div className="flex-1 bg-white rounded-md shadow-md p-4 flex flex-col justify-center items-center">
          <h2 className="text-[#993399] font-semibold mb-2">Total de Tarefas</h2>
          <h1 className="text-[60px] text-[#993399]">{total}</h1>
        </div>
        
        <div className="flex-1 bg-white rounded-md shadow-md p-2">
          <h2 className="text-[#993399] font-semibold mb-2">Tipos de Tarefa</h2>
          <ResponsivePie
            data={pie}
            margin={{ top: 40, right: 40, bottom: 80, left: 40 }}
            innerRadius={0.3}
            padAngle={2}
            cornerRadius={5}
            colors={{ scheme: "pink_yellowGreen" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor="black"
            legends={[{ anchor: "bottom", direction: "row", translateY: 56, itemWidth: 100, itemHeight: 18, symbolShape: "circle" }]}
          />
        </div>
      </div>

      <div className="bg-white rounded-md shadow-md p-2 h-[300px]">
        <h2 className="text-[#993399] font-semibold mb-2">Tarefas por Dia</h2>
        <ResponsiveLine
          data={line}
          margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", min: 0, max: "auto" }}
          axisBottom={{ legend: "Dia", legendOffset: 36 }}
          axisLeft={{ legend: "Qtd", legendOffset: -40 }}
          colors={{ scheme: "purpleRed_green" }}
          lineWidth={4}
          pointSize={8}
          pointBorderWidth={2}
          useMesh={true}
          isInteractive={true}
        />
      </div>
    </div>
  );
}
