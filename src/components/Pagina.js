"use client";

import { Container, Nav, Navbar } from "react-bootstrap";
import {
  FaTshirt,
  FaRegNewspaper,
  FaTags,
  FaRuler,
  FaPhoneAlt,
} from "react-icons/fa"; // Importando ícones

export default function Pagina({ titulo, children }) {
  return (
    <>
      {/* Barra de Navegação */}
      <Navbar style={{ backgroundColor: "#FFC0CB" }} variant="dark">
        <Container>
          {/* Nome da marca à esquerda com fonte moderna */}
          <Navbar.Brand
            href="/"
            style={{
              color: "#CD5C5C",
              fontFamily: "'Poppins', quicksand", // Definindo a fonte moderna
              fontWeight: 600, // Font weight mais forte para um efeito mais impactante
              fontSize: "1.8rem", // Tamanho da fonte maior para o nome da marca
            }}
          >
            GLAMOUR MODA FEMININA
          </Navbar.Brand>

          {/* Itens de navegação à direita */}
          <Nav className="ms-auto">
            <Nav.Link
              href="/novidades"
              style={{
                color: "#CD5C5C",
                border: "2px solid #CD5C5C", // Moldura ao redor do nome
                borderRadius: "5px", // Bordas arredondadas
                padding: "5px 15px", // Espaçamento interno
                transition: "all 0.3s ease", // Suavização da transição
              }}
              className="nav-item"
            >
              <FaRegNewspaper /> Novidades
            </Nav.Link>
            <Nav.Link
              href="/novidades"
              style={{
                color: "#CD5C5C",
                border: "2px solid #CD5C5C",
                borderRadius: "5px",
                padding: "5px 15px",
                transition: "all 0.3s ease",
              }}
              className="nav-item"
            >
              <FaTshirt /> Coleções
            </Nav.Link>
            <Nav.Link
              href="/promocoes"
              style={{
                color: "#CD5C5C",
                border: "2px solid #CD5C5C",
                borderRadius: "5px",
                padding: "5px 15px",
                transition: "all 0.3s ease",
              }}
              className="nav-item"
            >
              <FaTags /> Promoções
            </Nav.Link>
            <Nav.Link
              href="/tamanhos"
              style={{
                color: "#CD5C5C",
                border: "2px solid #CD5C5C",
                borderRadius: "5px",
                padding: "5px 15px",
                transition: "all 0.3s ease",
              }}
              className="nav-item"
            >
              <FaRuler /> Tamanhos
            </Nav.Link>
            <Nav.Link
              href="/contato"
              style={{
                color: "#CD5C5C",
                border: "2px solid #CD5C5C",
                borderRadius: "5px",
                padding: "5px 15px",
                transition: "all 0.3s ease",
              }}
              className="nav-item"
            >
              <FaPhoneAlt /> Contato
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Barra de Titulo */}
      <div className="bg-pink text-center text-white py-4">
        <h1>{titulo}</h1>
      </div>

      {/* Conteúdo da Página */}
      <Container className="mt-4">{children}</Container>

      <style jsx>{`
        /* Efeito de crescimento no hover */
        .nav-item:hover {
          transform: scale(1.1); /* Aumenta o tamanho do item */
          color: #fff; /* Muda a cor do texto ao passar o mouse */
          background-color: #CD5C5C; /* Muda o fundo ao passar o mouse */
          border-color: #fff; /* Muda a cor da borda */
        }
      `}</style>
    </>
  );
}
