"use client";

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function PromocoesPage() {
  const [promocoes, setPromocoes] = useState([]);

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const promocoesLocalStorage =
      JSON.parse(localStorage.getItem("promocoes")) || [];
    // Guarda a lista no estado de promoções
    setPromocoes(promocoesLocalStorage);
    console.log(promocoesLocalStorage);
  }, []);

  // Função para exclusão do item
  function excluir(produto) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o produto ${produto.nome}?`)) {
      // Filtra a lista antiga removendo o produto recebido
      const novaLista = promocoes.filter((item) => item.id !== produto.id);
      // Grava no localStorage a nova lista
      localStorage.setItem("promocoes", JSON.stringify(novaLista));
      // Grava a nova lista no estado para renderizar na tela
      setPromocoes(novaLista);
      alert("Produto excluído com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Promoções da Loja"}>
      <div className="text-end mb-2">
        <Button href="/promocoes/form">
          <FaPlusCircle /> Novo Produto em Promoção
        </Button>
      </div>

      {/* Tabela com os Produtos em Promoção */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Preço Original</th>
            <th>Preço com Desconto</th>
            <th>Estoque</th>
            <th>Disponibilidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {promocoes.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.nome}</td>
              <td>{produto.categoria}</td>
              <td>{produto.precoOriginal}</td>
              <td>{produto.precoComDesconto}</td>
              <td>{produto.estoque}</td>
              <td>{produto.disponibilidade ? "Disponível" : "Indisponível"}</td>
              <td className="text-center">
                {/* Botões das ações */}
                <Button
                  className="me-2"
                  href={`/promocoes/form?id=${produto.id}`}
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
