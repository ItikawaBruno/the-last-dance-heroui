"use client";
import { useState } from "react";
import { Input, Button, Select, SelectItem } from "@heroui/react";

type Role = "COLABORADOR" | "GESTOR";

export default function SignUp() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState<Role>("COLABORADOR");
  const [emailGestor, setEmailGestor] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Solução mais limpa: só inclui emailGestor se for COLABORADOR
    const body = {
      nome,
      email,
      senha,
      role,
      ...(role === "COLABORADOR" && emailGestor && { emailGestor })
    };

    console.log("Enviando dados:", body); // Para debug

    try {
      const res = await fetch("http://localhost:8080/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        const text = await res.text();
        alert("Erro ao cadastrar: " + text);
        return;
      }

      const usuario = await res.json();
      alert(`Usuário ${usuario.nome} cadastrado com sucesso!`);
      
      // Reset do formulário
      setNome("");
      setEmail("");
      setSenha("");
      setEmailGestor("");
      setRole("COLABORADOR");

    } catch (err) {
      console.error(err);
      alert("Erro de conexão com o servidor!");
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center space-y-4">
      <h1 className="text-[#d68fff] text-3xl text-[40px]">VIVI</h1>
      <h4 className="text-[#d68fff] text-[20px]">Seja Bem-vindo!</h4>

      <form
        className="w-full max-w-md bg-[#ddd6df] p-6 rounded-lg shadow-lg flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <Input 
          label="Nome" 
          placeholder="Digite seu nome" 
          value={nome} 
          onChange={e => setNome(e.target.value)} 
          required
        />
        
        <Input 
          label="E-mail" 
          placeholder="Digite seu email" 
          type="email"
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required
        />
        
        <Input 
          label="Senha" 
          placeholder="Digite sua senha" 
          type="password" 
          value={senha} 
          onChange={e => setSenha(e.target.value)} 
          required
        />

        <Select
          label="Cargo"
          selectedKeys={[role]}
          onSelectionChange={(keys) => {
            const selectedRole = Array.from(keys)[0] as Role;
            setRole(selectedRole);
            // Limpa o email do gestor quando muda para GESTOR
            if (selectedRole === "GESTOR") {
              setEmailGestor("");
            }
          }}
        >
          <SelectItem key="COLABORADOR" value="COLABORADOR">
            COLABORADOR
          </SelectItem>
          <SelectItem key="GESTOR" value="GESTOR">
            GESTOR
          </SelectItem>
        </Select>

        {role === "COLABORADOR" && (
          <Input
            label="E-mail do Gestor"
            placeholder="Digite o e-mail do gestor"
            type="email"
            value={emailGestor}
            onChange={e => setEmailGestor(e.target.value)}
            required
          />
        )}

        <Button 
          className="mt-4 w-full bg-[#882abe] text-white rounded-md p-2" 
          type="submit"
        >
          Cadastrar
        </Button>
      </form>
    </div>
  );
}