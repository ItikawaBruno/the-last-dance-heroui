'use client'

import { Select, SelectItem } from "@heroui/react";
import { Button } from "@heroui/button";

export default function Tarefas(){
    return(
        <>
            <div className="h-full w-full flex flex-col space-y-1">
                <div className="w-full h-fit bg-[#ffff] flex items-center p-2 rounded-md shadow-md">                
                    <div className="w-full p-1 flex flex-col">
                        <label className="text-[#993399] font-bold">Tarefas</label>
                        <input type="text" placeholder="Pesquise pelo titulo da tarefa" className="outline-[#993399] bg-[#e2e2e2] p-2 rounded-md text-black"/>
                    </div>
                    <div className="w-full">
                        <select className="bg-[#993399] w-full p-1 rounded-md mt-7">
                            <option value="" className="bg-[#993399]">concluído</option>
                            <option value="" className="bg-[#993399]">pendente</option>
                            <option value="" className="bg-[#993399]">finalizado</option>
                        </select>
                    </div>
                </div>
                <div className="h-full w-full bg-[#ffff] rounded-md shadow-md overflow-y-auto p-2">
                    <h1 className="text-[#993399] font-bold">Minhas Tarefas</h1>
                    <ul className="w-full overflow-y-auto flex flex-col">
                        <li className="w-full bg-[#993399] p-2 text-white rounded-md shadow-md flex justify-between items-center px-6">
                            <p className="font-bold">Titulo</p>
                            <Button className="bg-[#df5ef0] px-4 p-1 rounded-md ">Abrir</Button>
                        </li>
                    </ul>
                </div>
            </div> 
        </>
    );
}