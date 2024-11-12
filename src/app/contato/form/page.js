"use client";

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";

export default function ContatoFormPage(props) {
  // router -> hook para navegação de telas
  const router = useRouter();

  // Buscar a lista de contatos no localStorage, se não existir, inicializa uma lista vazia
  const contatos = JSON.parse(localStorage.getItem("contato")) || [];

  // Recuperando id para edição
  const id = props.searchParams.id;
  console.log(props.searchParams.id);
  // Buscar na lista o contato com o ID recebido no parametro
  const contatoEditado = contatos.find((item) => item.id == id);
  console.log(contatoEditado);

  // Função para salvar os dados do formulário
  function salvar(dados) {
    // Se contatoEditado existe, muda os dados e grava no localStorage
    if (contatoEditado) {
      Object.assign(contatoEditado, dados);
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem("contato", JSON.stringify(contatos));
    } else {
      // se contatoEditado não existe, é criação de um novo
      // gerar um ID (Identificador único)
      dados.id = v4();
      // Adiciona o novo contato na lista
      contatos.push(dados);
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem("contato", JSON.stringify(contatos));
    }

    alert("Contato salvo com sucesso!");
    router.push("/contato");
  }

  // Campos do formulário e valores iniciais (default)
  const initialValues = {
    nome: "",
    email: "",
    assunto: "",
    telefone: "",
    mensagem: "",
    imagem: "",
    dataContato: "",
    status: "Ativo",
  };

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email("Email inválido").required("Campo obrigatório"),
    assunto: Yup.string().required("Campo obrigatório"),
    telefone: Yup.string()
      .matches(
        /^(\+?\d{1,4}[\s-])?(?:\(\d{1,3}\)[\s-]?)?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9}$/,
        "Telefone inválido"
      )
      .required("Campo obrigatório"),
    mensagem: Yup.string().required("Campo obrigatório"),
    imagem: Yup.string().url("URL inválida").required("Campo obrigatório"),
    dataContato: Yup.date().required("Campo obrigatório"),
    status: Yup.string().required("Campo obrigatório"),
  });

  return (
    <Pagina titulo={"Cadastro de Contato"}>
      {/* Formulário */}
      <Formik
        // Atributos do formik
        // Se for edição, coloca os dados de contatoEditado
        // Se for novo, coloca o initialValues com os valores vazios
        initialValues={contatoEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {/* Construção do template do formulário */}
        {
          // Os valores e funções do formik
          ({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => {
            return (
              <Form onSubmit={handleSubmit}>
                {/* Campos do formulário */}
                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>Nome:</Form.Label>
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
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.email && !errors.email}
                      isInvalid={touched.email && errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>Assunto:</Form.Label>
                    <Form.Select
                      name="assunto"
                      value={values.assunto}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.assunto && !errors.assunto}
                      isInvalid={touched.assunto && errors.assunto}
                    >
                      <option value="">Selecione</option>
                      <option value="Dúvida">Dúvida</option>
                      <option value="Sugestão">Sugestão</option>
                      <option value="Reclamação">Reclamação</option>
                      <option value="Elogio">Elogio</option>
                      <option value="Outros">Outros</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.assunto}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Telefone:</Form.Label>
                    <Form.Control
                      name="telefone"
                      type="text"
                      value={values.telefone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.telefone && !errors.telefone}
                      isInvalid={touched.telefone && errors.telefone}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.telefone}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>Mensagem:</Form.Label>
                    <Form.Control
                      name="mensagem"
                      as="textarea"
                      value={values.mensagem}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.mensagem && !errors.mensagem}
                      isInvalid={touched.mensagem && errors.mensagem}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.mensagem}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Imagem (URL):</Form.Label>
                    <Form.Control
                      name="imagem"
                      type="text"
                      value={values.imagem}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.imagem && !errors.imagem}
                      isInvalid={touched.imagem && errors.imagem}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.imagem}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>Data do Contato:</Form.Label>
                    <Form.Control
                      name="dataContato"
                      type="date"
                      value={values.dataContato}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.dataContato && !errors.dataContato}
                      isInvalid={touched.dataContato && errors.dataContato}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.dataContato}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Status:</Form.Label>
                    <Form.Select
                      name="status"
                      value={values.status}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.status && !errors.status}
                      isInvalid={touched.status && errors.status}
                    >
                      <option value="Ativo">Ativo</option>
                      <option value="Inativo">Inativo</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.status}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                {/* Botões */}
                <Form.Group className="text-end">
                  <Button className="me-2" href="/contato">
                    <FaArrowLeft /> Voltar
                  </Button>
                  <Button type="submit" variant="success">
                    <FaCheck /> Salvar
                  </Button>
                </Form.Group>
              </Form>
            );
          }
        }
      </Formik>
    </Pagina>
  );
}
