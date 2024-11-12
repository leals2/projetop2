"use client";

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";
import InputMask from "react-input-mask"; // Importando o InputMask

export default function ColecaoFormPage(props) {
  const router = useRouter();

  // Criar estados(react) para armazenar os dados dos selects
  const [cores, setCores] = useState([
    "Azul",
    "Vermelho",
    "Verde",
    "Preto",
    "Branco",
    "Rosa",
  ]);
  const [tamanhos, setTamanhos] = useState(["P", "M", "G", "GG", "Único"]);

  // Recuperando id para edição
  const id = props.searchParams.id;
  const colecoes = JSON.parse(localStorage.getItem("colecoes")) || [];

  const colecaoEditada = colecoes.find((item) => item.id == id);

  // Função para salvar os dados do formulário
  function salvar(dados) {
    // Se for edição, atualiza os dados
    if (colecaoEditada) {
      Object.assign(colecaoEditada, dados);
      localStorage.setItem("colecoes", JSON.stringify(colecoes));
    } else {
      // Se for criação, adiciona uma nova coleção
      dados.id = v4();
      colecoes.push(dados);
      localStorage.setItem("colecoes", JSON.stringify(colecoes));
    }

    alert("Coleção salva com sucesso!");
    router.push("/colecoes");
  }

  // Campos do form e valores iniciais
  const initialValues = {
    nome: "",
    tipoRoupa: "",
    descricao: "",
    preco: "",
    tamanho: "M",
    cor: "Azul",
    dataLancamento: "",
    estilo: "",
  };

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    tipoRoupa: Yup.string().required("Campo obrigatório"),
    descricao: Yup.string().required("Campo obrigatório"),
    preco: Yup.number()
      .required("Campo obrigatório")
      .positive("Preço deve ser um valor positivo"),
    tamanho: Yup.string().required("Campo obrigatório"),
    cor: Yup.string().required("Campo obrigatório"),
    dataLancamento: Yup.date().required("Campo obrigatório").nullable(),
    estilo: Yup.string().required("Campo obrigatório"),
  });

  return (
    <Pagina titulo={"Cadastro de Coleção de Roupas"}>
      {/* Formulário */}
      <Formik
        initialValues={colecaoEditada || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          return (
            <Form onSubmit={handleSubmit}>
              {/* Nome da Coleção */}
              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Nome da Coleção:</Form.Label>
                  <Form.Control
                    name="nome"
                    type="text"
                    value={values.nome}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.nome && !errors.nome}
                    isInvalid={touched.nome && errors.nome}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nome}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              {/* Tipo de Roupa */}
              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Tipo de Roupa:</Form.Label>
                  <Form.Control
                    name="tipoRoupa"
                    type="text"
                    value={values.tipoRoupa}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.tipoRoupa && !errors.tipoRoupa}
                    isInvalid={touched.tipoRoupa && errors.tipoRoupa}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.tipoRoupa}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              {/* Descrição da Coleção */}
              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Descrição:</Form.Label>
                  <Form.Control
                    name="descricao"
                    as="textarea"
                    rows={3}
                    value={values.descricao}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.descricao && !errors.descricao}
                    isInvalid={touched.descricao && errors.descricao}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.descricao}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              {/* Preço - Aplicando máscara de moeda */}
              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Preço:</Form.Label>
                  <InputMask
                    mask="R$ 999.999,99"
                    name="preco"
                    value={values.preco}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.preco && !errors.preco}
                    isInvalid={touched.preco && errors.preco}
                  >
                    {(inputProps) => <Form.Control {...inputProps} />}
                  </InputMask>
                  <Form.Control.Feedback type="invalid">
                    {errors.preco}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              {/* Tamanho */}
              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Tamanho:</Form.Label>
                  <Form.Select
                    name="tamanho"
                    value={values.tamanho}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.tamanho && !errors.tamanho}
                    isInvalid={touched.tamanho && errors.tamanho}
                  >
                    {tamanhos.map((tamanho) => (
                      <option key={tamanho} value={tamanho}>
                        {tamanho}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.tamanho}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              {/* Cor */}
              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Cor:</Form.Label>
                  <Form.Select
                    name="cor"
                    value={values.cor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.cor && !errors.cor}
                    isInvalid={touched.cor && errors.cor}
                  >
                    {cores.map((cor) => (
                      <option key={cor} value={cor}>
                        {cor}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.cor}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              {/* Data de Lançamento - Aplicando máscara de data */}
              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Data de Lançamento:</Form.Label>
                  <InputMask
                    mask="99/99/9999"
                    name="dataLancamento"
                    value={values.dataLancamento}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.dataLancamento && !errors.dataLancamento}
                    isInvalid={touched.dataLancamento && errors.dataLancamento}
                  >
                    {(inputProps) => <Form.Control {...inputProps} />}
                  </InputMask>
                  <Form.Control.Feedback type="invalid">
                    {errors.dataLancamento}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              {/* Estilo */}
              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Estilo:</Form.Label>
                  <Form.Control
                    name="estilo"
                    type="text"
                    value={values.estilo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.estilo && !errors.estilo}
                    isInvalid={touched.estilo && errors.estilo}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.estilo}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              {/* Botões */}
              <Form.Group className="text-end">
                <Button className="me-2" href="/colecoes">
                  <FaArrowLeft /> Voltar
                </Button>
                <Button type="submit" variant="success">
                  <FaCheck /> Enviar
                </Button>
              </Form.Group>
            </Form>
          );
        }}
      </Formik>
    </Pagina>
  );
}
