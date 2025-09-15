"use client"
import { Button, Progress } from "@heroui/react";

export default function Home(){
    return(
        <>
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
                            <li className="flex bg-slate-200 shadow-md justify-between items-center px-4 rounded p-2">Lista 1 <button className="px-5 py-1 rounded-md bg-[#993399] text-white">Visualizar</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}