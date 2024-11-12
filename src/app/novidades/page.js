"use client";

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlusCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function NovidadesListPage() {
  const [novidades, setNovidades] = useState([]);
  const router = useRouter();

  // Função para carregar as novidades do localStorage
  useEffect(() => {
    const storedNovidades = JSON.parse(localStorage.getItem("novidades")) || [];
    setNovidades(storedNovidades);
  }, []);

  // Função para excluir uma novidade
  const excluirNovidade = (id) => {
    const confirmDelete = window.confirm("Você tem certeza que deseja excluir?");
    if (confirmDelete) {
      const updatedNovidades = novidades.filter((novidade) => novidade.id !== id);
      localStorage.setItem("novidades", JSON.stringify(updatedNovidades));
      setNovidades(updatedNovidades);
      alert("Produto excluído com sucesso!");
    }
  };

  return (
    <Pagina titulo="Lista de Novidades">
      <Button href='/novidades/form'><FaPlusCircle /> Adicionar Nova Novidade </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Disponibilidade</th>
            <th>Data de Lançamento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {novidades.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">
                Nenhuma novidade cadastrada.
              </td>
            </tr>
          ) : (
            novidades.map((novidade) => (
              <tr key={novidade.id}>
                <td>{novidade.nome}</td>
                <td>{novidade.descricao}</td>
                <td>{novidade.categoria}</td>
                <td>{`R$ ${novidade.preco.toFixed(2)}`}</td>
                <td>{novidade.estoque}</td>
                <td>{novidade.disponibilidade ? "Disponível" : "Indisponível"}</td>
                <td>{new Date(novidade.dataLancamento).toLocaleDateString()}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => router.push(`/novidades/cadastrar?id=${novidade.id}`)}
                    className="me-2"
                  >
                    <FaEdit /> Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => excluirNovidade(novidade.id)}
                  >
                    <FaTrash /> Excluir
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Pagina>
  );
}
