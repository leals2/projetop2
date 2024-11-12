"use client";

import Pagina from "@/components/Pagina";
import { Button, Card, Col, Row } from "react-bootstrap";

export default function HomePage() {
  // Simulação de dados no localStorage
  const novidades = JSON.parse(localStorage.getItem("novidades")) || [];
  const colecoes = JSON.parse(localStorage.getItem("colecoes")) || [];
  const promocoes = JSON.parse(localStorage.getItem("promocoes")) || [];
  const tamanhos = JSON.parse(localStorage.getItem("tamanhos")) || [];
  const contato = JSON.parse(localStorage.getItem("contato")) || [];

  // Lista de categorias da loja
  const lista = [
    {
      nome: "Novidades",
      imagem:
        "https://i.pinimg.com/564x/85/de/dc/85dedc33649ed5705db83489112f7fe7.jpg", // Substitua por uma imagem de novidades de roupas
      quantidade: novidades.length,
      link: "/novidades",
    },
    {
      nome: "Coleções",
      imagem:
        "https://i.pinimg.com/564x/03/ed/2b/03ed2b95e82d332f8fc347dd4f972ab6.jpg", // Imagem para coleções
      quantidade: colecoes.length,
      link: "/colecoes",
    },
    {
      nome: "Promoções",
      imagem:
        "https://i.pinimg.com/564x/53/44/83/5344835592f82ee856e5cdd3e7dfcf12.jpg", // Imagem para promoções
      quantidade: promocoes.length,
      link: "/promocoes",
    },
    {
      nome: "Tamanhos",
      imagem:
        "https://i.pinimg.com/564x/ed/fc/09/edfc09d903ea37ade69497be93e3aa76.jpg", // Imagem representando tamanhos de roupas
      quantidade: tamanhos.length,
      link: "/tamanhos",
    },
    {
      nome: "Contato",
      imagem: "https://i.pinimg.com/564x/40/64/9f/40649f5e2f5519024b1d5ed30723caf6.jpg", // Imagem para a seção de contato
      quantidade: contato.length,
      link: "/contato",
    },
  ];

  return (
    <Pagina titulo={"GLAMOUR MODA FEMININA"}>
      {/* Usando d-flex, justify-content-center e flex-wrap para garantir o alinhamento e centralização */}
      <Row className="d-flex justify-content-center flex-wrap">
        {lista.map((item) => (
          <Col
            className="py-2 d-flex justify-content-center"
            key={item.nome}
            xs={12} sm={6} md={4} lg={2}
          >
            <Card
              style={{
                height: "100%", // Faz os cards terem o mesmo tamanho
                backgroundColor: "#f06292", // Cor rosa de fundo
              }}
            >
              <Card.Img
                src={item.imagem}
                style={{
                  height: "200px", // Define uma altura fixa para as imagens
                  objectFit: "cover", // Faz a imagem preencher a área sem distorção
                }}
              />
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title>{item.nome}</Card.Title>
                <p>{item.quantidade} itens disponíveis</p>
              </Card.Body>
              <Card.Footer className="text-end">
                <Button className="bg-danger" href={item.link}>
                  Ver {item.nome}
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Pagina>
  );
}
