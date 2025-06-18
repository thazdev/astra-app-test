import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { LOGIN } from "../graphql/mutations";

export default function Login() {
  const [input, setInput] = useState({ email: "", password: "" });
  const [login, { data, error, loading }] = useMutation(LOGIN);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await login({ variables: { input } });
    localStorage.setItem("token", res.data.login.token);
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Email"
        value={input.email}
        onChange={(e) => setInput({ ...input, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Senha"
        value={input.password}
        onChange={(e) => setInput({ ...input, password: e.target.value })}
      />
      <button disabled={loading}>Entrar</button>
      {error && <p>Erro!</p>}
      {data && <p>Bem-vindo {data.login.user.name}</p>}
    </form>
  );
}
