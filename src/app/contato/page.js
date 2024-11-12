"use client";

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import {
  FaPen,
  FaPlusCircle,
  FaTrash,
  FaWhatsapp,
  FaInstagram,
  FaMapMarkedAlt,
} from "react-icons/fa";

export default function ContatosPage() {
  const [contatos, setContatos] = useState([]);

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const contatosLocalStorage =
      JSON.parse(localStorage.getItem("contato")) || [];
    // guarda a lista no estado
    setContatos(contatosLocalStorage);
    console.log(contatosLocalStorage);
  }, []);

  // Função para exclusão do item
  function excluir(contato) {
    // Confirma com o usuário a exclusão
    if (
      window.confirm(`Deseja realmente excluir o contato de ${contato.nome}?`)
    ) {
      // filtra a lista antiga removando o contato recebido
      const novaLista = contatos.filter((item) => item.id !== contato.id);
      // grava no localStorage a nova lista
      localStorage.setItem("contato", JSON.stringify(novaLista));
      // grava a nova lista no estado para renderizar na tela
      setContatos(novaLista);
      alert("Contato excluído com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Lista de Contatos"}>
      <div className="text-end mb-2">
        <Button href="/contato/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      {/* Tabela com os Contatos */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Assunto</th>
            <th>Telefone</th>
            <th>Data de Contato</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {contatos.map((contato) => {
            return (
              <tr key={contato.id}>
                <td>{contato.nome}</td>
                <td>{contato.email}</td>
                <td>{contato.assunto}</td>
                <td>{contato.telefone}</td>
                <td>{contato.dataContato}</td>
                <td className="text-center">
                  {/* Botões das ações */}
                  <Button
                    className="me-2"
                    href={`/contato/form?id=${contato.id}`}
                  >
                    <FaPen />
                  </Button>
                  <Button variant="danger" onClick={() => excluir(contato)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {/* Informações de Contato e Mapa */}
      <div className="mt-5">
        <h4>Informações de Contato</h4>
        <div className="mb-2">
          <p>
            <FaWhatsapp className="me-2" />
            <strong>WhatsApp:</strong>{" "}
            <a href="https://api.whatsapp.com/send/?phone=61996441865&text&type=phone_number&app_absent=0" target="_blank">
              Clique aqui para conversar
            </a>
          </p>
          <p>
            <FaInstagram className="me-2" />
            <strong>Instagram:</strong>{" "}
            <a href="https://www.instagram.com/glamourmf__/" target="_blank">
              @glamourmf__
            </a>
          </p>
        </div>

        {/* Mapa - Google Maps Embed */}
        <h5>
          <FaMapMarkedAlt className="me-2" /> Localização da Loja
        </h5>
        <div style={{ width: "100%", height: "400px" }}>
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.61286625288!2d-47.97935869999999!3d-15.823098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a2d1eaa99a559%3A0x308a3b43bf2aff10!2sRiacho+Fundo+II+%7C+1A+Etapa+Qn+12D+Conjunto+7+-+Riacho+Fundo+II+-+1A+Etapa+QN+12D+Conj.+7+-+Riacho+Fundo+II%2C+Bras%C3%ADlia+-+DF%2C+71881-645!5e0!3m2!1spt-BR!2sbr!4v1639245754641!5m2!1spt-BR!2sbr"
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        </div>
      </div>
    </Pagina>
  );
}
