'use client'

import { useState } from "react";
import { Input, Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        if (!email || !senha) return alert("Preencha todos os campos!");

        setLoading(true);

        try {
            const res = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha })
            });

            if (!res.ok) {
                alert("E-mail ou senha inválidos!");
                setLoading(false);
                return;
            }

            const data = await res.json();
            // aqui já vem { token, nome, email, role }
            localStorage.setItem("token", data.token);

            alert("Login realizado com sucesso!");

            // Redireciona conforme o role
            if (data.role === "COLABORADOR") {
                router.push("/colaborador/home");
            } else if (data.role === "GESTOR") {
                router.push("/gestor/home");
            } else {
                router.push("/"); // fallback
            }
        } catch (err) {
            console.error(err);
            alert("Erro de conexão com o servidor!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full flex flex-col justify-center items-center space-y-4">
            <h1 className="text-[#d68fff] text-3xl text-[40px]">VIVI</h1>
            <h4 className="text-[#d68fff]">Bem-vindo de volta!</h4>
            <form 
                className="w-full max-w-md bg-[#ddd6df] p-6 rounded-lg shadow-lg flex flex-col gap-4"
                onSubmit={handleLogin}
            >
                <Input 
                    label="E-mail" 
                    placeholder="Digite seu e-mail" 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.currentTarget.value)}
                />
                <Input 
                    label="Senha" 
                    placeholder="Digite sua senha" 
                    type="password" 
                    value={senha} 
                    onChange={e => setSenha(e.currentTarget.value)}
                />
                <Button 
                    className="mt-4 w-full bg-[#882abe] text-white rounded-md p-2"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Entrando..." : "Entrar"}
                </Button>
            </form>
        </div>
    );
}
