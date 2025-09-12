'use client'
import { Form, Input, Button } from "@heroui/react";

export default function SignUp() {
    return (
        <div className="min-h-screen w-full flex flex-col justify-center items-center space-y-4">
            <h1 className="text-[#d68fff] text-3xl text-[40px]">VIVI</h1>
            <h4 className="text-[#d68fff] text-[20px]">Seja Bem-vindo!</h4>
            <form className="w-full max-w-md bg-[#ddd6df] p-6 rounded-lg shadow-lg flex flex-col gap-4">
                <div className="w-full h-fit flex flex-col">
                    <label className="text-[#9615bd]">Nome</label>
                    <input type="text" className="rounded-md shadow-md p-1 outline-[#7c00ad]" placeholder="Digite seu e-mail"/>
                </div>
                <div className="w-full h-fit flex flex-col">
                    <label className="text-[#9615bd]">E-mail</label>
                    <input type="email" className="rounded-md shadow-md p-1 outline-[#7c00ad]" placeholder="Digite seu e-mail"/>
                </div>
                <div className="w-full h-fit flex flex-col">
                    <label className="text-[#9615bd]">Senha</label>
                    <input type="password" className="rounded-md shadow-md p-1 outline-[#7c00ad]" placeholder="Digite sua senha"/>
                </div>
                <button className="mt-4 w-full bg-[#882abe] text-white rounded-md p-2">
                    Cadastrar
                </button>
            </form>
        </div>
    );
}