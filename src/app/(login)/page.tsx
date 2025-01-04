'use client';

import { Metadata } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export const metadata: Metadata = {
  title: "Login",
  description: "Faça seu login no site",
}

export default function Login() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      alert("Credenciais inválidas!");
    } else {
      alert("Login realizado com sucesso!");
    }
  };

  return (
    <div>
      {session ? (
        <div>
          <p>Bem-vindo, {session.user?.name}</p>
          <button onClick={() => signOut()}>Sair</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Senha:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Entrar</button>
        </form>
      )}
    </div>
  );
}
