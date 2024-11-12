"use client";

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";

export default function TamanhoFormPage(props) {
  const router = useRouter();

  // Lista de tamanhos disponíveis
  const tamanhos = ["P", "M", "G", "GG", "XGG", "Único"];

  // Buscar a lista de tamanhos de roupas no localStorage, se não existir, inicializa uma lista vazia
  const tamanhosRoupas =
    JSON.parse(localStorage.getItem("tamanhosRoupas")) || [];

  // Recuperando id para edição
  const id = props.searchParams.id;

  // Buscar o tamanho de roupa com o ID recebido no parametro
  const tamanhoEditado = tamanhosRoupas.find((item) => item.id == id);

  // Função para salvar os dados do form
  function salvar(dados) {
    if (tamanhoEditado) {
      Object.assign(tamanhoEditado, dados);
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem("tamanhosRoupas", JSON.stringify(tamanhosRoupas));
    } else {
      dados.id = v4();
      tamanhosRoupas.push(dados);
      localStorage.setItem("tamanhosRoupas", JSON.stringify(tamanhosRoupas));
    }

    alert("Tamanho de roupa salvo com sucesso!");
    router.push("/tamanhos");
  }

  // Campos do formulário e valores iniciais (default)
  const initialValues = {
    nome: "",
    descricao: "",
    tamanho: "",
    estoque: "",
    disponibilidade: true,
    dataLancamento: "",
  };

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    descricao: Yup.string().required("Campo obrigatório"),
    tamanho: Yup.string().required("Campo obrigatório"),
    estoque: Yup.number()
      .required("Campo obrigatório")
      .min(0, "Estoque não pode ser negativo"),
    disponibilidade: Yup.boolean().required("Campo obrigatório"),
    dataLancamento: Yup.date().required("Campo obrigatório"),
  });

  return (
    <Pagina titulo={"Cadastro de Tamanho de Roupa"}>
      <Formik
        initialValues={tamanhoEditado || initialValues}
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
        }) => (
          <Form onSubmit={handleSubmit}>
            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Nome do Tamanho:</Form.Label>
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

              <Form.Group as={Col}>
                <Form.Label>Descrição:</Form.Label>
                <Form.Control
                  name="descricao"
                  type="text"
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
                  <option value="">Selecione</option>
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

              <Form.Group as={Col}>
                <Form.Label>Estoque:</Form.Label>
                <Form.Control
                  name="estoque"
                  type="number"
                  value={values.estoque}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.estoque && !errors.estoque}
                  isInvalid={touched.estoque && errors.estoque}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.estoque}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Disponibilidade:</Form.Label>
                <Form.Select
                  name="disponibilidade"
                  value={values.disponibilidade ? "true" : "false"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.disponibilidade && !errors.disponibilidade}
                  isInvalid={touched.disponibilidade && errors.disponibilidade}
                >
                  <option value="true">Disponível</option>
                  <option value="false">Indisponível</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.disponibilidade}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Data de Lançamento:</Form.Label>
                <Form.Control
                  name="dataLancamento"
                  type="date"
                  value={values.dataLancamento}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.dataLancamento && !errors.dataLancamento}
                  isInvalid={touched.dataLancamento && errors.dataLancamento}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.dataLancamento}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Botões */}
            <Form.Group className="text-end">
              <Button className="me-2" href="/tamanhos">
                <FaArrowLeft /> Voltar
              </Button>
              <Button type="submit" variant="success">
                <FaCheck /> Salvar
              </Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </Pagina>
  );
}
