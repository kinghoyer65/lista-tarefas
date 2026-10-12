"use client";

import { useMemo, useState } from "react";

type Tarefa = {
  id: number;
  texto: string;
  feita: boolean;
};

type Filtro = "todas" | "por-fazer" | "feitas";

export default function ListaTarefas() {
  const [texto, setTexto] = useState("");
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [filtro, setFiltro] = useState<Filtro>("todas");

  function adicionar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const textoLimpo = texto.trim();
    if (!textoLimpo) return;

    const novaTarefa: Tarefa = {
      id: Date.now(),
      texto: textoLimpo,
      feita: false,
    };

    setTarefas([...tarefas, novaTarefa]);
    setTexto("");
  }

  function apagar(id: number) {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
  }

  function alternarFeita(id: number) {
    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, feita: !tarefa.feita } : tarefa
      )
    );
  }

  const tarefasFiltradas = useMemo(() => {
    if (filtro === "feitas") {
      return tarefas.filter((tarefa) => tarefa.feita);
    }

    if (filtro === "por-fazer") {
      return tarefas.filter((tarefa) => !tarefa.feita);
    }

    return tarefas;
  }, [tarefas, filtro]);

  const feitas = tarefas.filter((tarefa) => tarefa.feita).length;

  return (
    <div style={{ padding: "24px" }}>
      <h1>Lista de tarefas</h1>

      <p>
        {feitas} de {tarefas.length} tarefas concluídas
      </p>

      <form onSubmit={adicionar}>
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escreve uma tarefa"
        />
        <button type="submit">Adicionar</button>
      </form>

      <div style={{ marginTop: "16px", marginBottom: "16px" }}>
        <button type="button" onClick={() => setFiltro("todas")}>
          Todas
        </button>
        <button type="button" onClick={() => setFiltro("por-fazer")}>
          Por fazer
        </button>
        <button type="button" onClick={() => setFiltro("feitas")}>
          Feitas
        </button>
      </div>

      {tarefasFiltradas.length === 0 ? (
        <p>Ainda não há tarefas</p>
      ) : (
        <ul>
          {tarefasFiltradas.map((tarefa) => (
            <li key={tarefa.id} style={{ marginBottom: "8px" }}>
              <span
                style={{
                  textDecoration: tarefa.feita ? "line-through" : "none",
                  marginRight: "8px",
                }}
              >
                {tarefa.texto}
              </span>

              <button type="button" onClick={() => alternarFeita(tarefa.id)}>
                {tarefa.feita ? "Desmarcar" : "Concluir"}
              </button>

              <button type="button" onClick={() => apagar(tarefa.id)}>
                Apagar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}