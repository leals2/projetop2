"use client";

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Registrando os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ColecoesPage() {
  const [colecoes, setColecoes] = useState([]);

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const colecoesLocalStorage =
      JSON.parse(localStorage.getItem("colecoes")) || [];
    // guarda a lista no estado colecoes
    setColecoes(colecoesLocalStorage);
    console.log(colecoesLocalStorage);
  }, []);

  // Função para exclusão do item
  function excluir(colecao) {
    // Confirma com o usuário a exclusão
    if (
      window.confirm(`Deseja realmente excluir a coleção "${colecao.nome}"?`)
    ) {
      // filtra a lista antiga removando a coleção recebida
      const novaLista = colecoes.filter((item) => item.id !== colecao.id);
      // grava no localStorage a nova lista
      localStorage.setItem("colecoes", JSON.stringify(novaLista));
      // grava a nova lista no estado para renderizar na tela
      setColecoes(novaLista);
      alert("Coleção excluída com sucesso!");
    }
  }

  // Preparando dados para o gráfico
  const tipoDeRoupaCount = colecoes.reduce((acc, colecao) => {
    const tipo = colecao.tipoRoupa || "Outro";
    acc[tipo] = acc[tipo] ? acc[tipo] + 1 : 1;
    return acc;
  }, {});

  const labels = Object.keys(tipoDeRoupaCount);
  const data = Object.values(tipoDeRoupaCount);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Quantidade de Coleções por Tipo de Roupa',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Pagina titulo={"Coleções de Roupas"}>
      {/* Dashboard com Gráfico Interativo */}
      <div className="dashboard mb-4">
        <h4>Visão Geral das Coleções</h4>
        <div className="mb-4" style={{ height: '300px' }}>
          {/* Gráfico de Barras com a distribuição por tipo de roupa */}
          <Bar data={chartData} options={{ responsive: true }} />
        </div>
      </div>

      <div className="text-end mb-2">
        <Button href="/colecoes/form">
          <FaPlusCircle /> Nova Coleção
        </Button>
      </div>

      {/* Tabela com as coleções */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome da Coleção</th>
            <th>Descrição</th>
            <th>Tipo de Roupa</th>
            <th>Tamanho</th>
            <th>Cor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {colecoes.map((colecao) => {
            return (
              <tr key={colecao.id}>
                <td>{colecao.nome}</td>
                <td>{colecao.descricao}</td>
                <td>{colecao.tipoRoupa}</td>
                <td>{colecao.tamanho}</td>
                <td>{colecao.cor}</td>
                <td className="text-center">
                  {/* Botões das ações */}
                  <Button
                    className="me-2"
                    href={`/colecoes/form?id=${colecao.id}`}
                  >
                    <FaPen />
                  </Button>
                  <Button variant="danger" onClick={() => excluir(colecao)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Pagina>
  );
}
