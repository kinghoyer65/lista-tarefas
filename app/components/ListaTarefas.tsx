"use client";

import { useState } from "react";

export default function ListaTarefas() {
  const [texto, setTexto] = useState("");
  const [tarefas, setTarefas] = useState<string[]>([]);

  function adicionar() {
    setTarefas([...tarefas, texto]);
    setTexto("");
  }

  return (
    <div>
      <h1>Lista de tarefas</h1>

      <input
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escreve uma tarefa"
      />
      <button onClick={adicionar}>Adicionar</button>

      {tarefas.length === 0 ? (
        <p>Ainda não há tarefas</p>
      ) : (
        <ul>
          {tarefas.map((tarefa, index) => (
            <li key={index}>{tarefa}</li>
          ))}
        </ul>
      )}
    </div>
  );
}