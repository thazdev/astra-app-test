import { useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_USER } from "../graphql/mutations";

export default function Register() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [createUser, { loading, error, data }] = useMutation(CREATE_USER, {
    onCompleted: (res) => {
      // guarda no localStorage (simples — ajuste conforme precisar)
      localStorage.setItem("user", JSON.stringify(res.createUser));

      // redireciona (pode ser dashboard ou primeira rota protegida)
      navigate("/contracts/123");
    },
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await createUser({ variables: { input } });
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        maxWidth: 240,
      }}
    >
      <input
        placeholder="Nome"
        value={input.name}
        onChange={(e) => setInput({ ...input, name: e.target.value })}
      />

      <input
        type="email"
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

      <button type="submit" disabled={loading}>
        {loading ? "Enviando…" : "Cadastrar"}
      </button>

      {error && <p style={{ color: "red" }}>Erro: {error.message}</p>}

      {data && <p data-testid="success">Cadastrado com sucesso</p>}
    </form>
  );
}
