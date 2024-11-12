"use client";

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function TamanhosPage() {
  const [tamanhos, setTamanhos] = useState([]);

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const tamanhosLocalStorage =
      JSON.parse(localStorage.getItem("tamanhos")) || [];
    // Guarda a lista no estado de tamanhos
    setTamanhos(tamanhosLocalStorage);
    console.log(tamanhosLocalStorage);
  }, []);

  // Função para exclusão do item
  function excluir(produto) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o produto ${produto.nome}?`)) {
      // Filtra a lista antiga removendo o produto recebido
      const novaLista = tamanhos.filter((item) => item.id !== produto.id);
      // Grava no localStorage a nova lista
      localStorage.setItem("tamanhos", JSON.stringify(novaLista));
      // Grava a nova lista no estado para renderizar na tela
      setTamanhos(novaLista);
      alert("Produto excluído com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Tamanho dos Produtos na Loja"}>
      <div className="text-end mb-2">
        <Button href="/tamanhos/form">
          <FaPlusCircle /> Novo Produto
        </Button>
      </div>

      {/* Tabela com os Produtos por Tamanho */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Tamanho</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Disponibilidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tamanhos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.nome}</td>
              <td>{produto.categoria}</td>
              <td>{produto.tamanho}</td>
              <td>{produto.preco}</td>
              <td>{produto.estoque}</td>
              <td>{produto.disponibilidade ? "Disponível" : "Indisponível"}</td>
              <td className="text-center">
                {/* Botões das ações */}
                <Button
                  className="me-2"
                  href={`/tamanhos/form?id=${produto.id}`}
                >
                  <FaPen />
                </Button>
                <Button variant="danger" onClick={() => excluir(produto)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  );
}
