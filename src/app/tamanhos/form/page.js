"use client";

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";

export default function PromocaoFormPage(props) {
  // router -> hook para navegação de telas
  const router = useRouter();

  // Busca a lista de categorias para usar no select
  const categorias = [
    "Vestidos",
    "Blusas",
    "Calças",
    "Saia",
    "Jaquetas",
    "Casacos",
    "Acessórios",
    "Roupas Íntimas",
  ];

  // Buscar a lista de promoções no localStorage, se não existir, inicializa uma lista vazia
  const promocoes = JSON.parse(localStorage.getItem("promocoes")) || [];

  // Recuperando id para edição
  const id = props.searchParams.id;
  console.log(props.searchParams.id);

  // Buscar na lista o produto com o ID recebido no parametro
  const promocaoEditada = promocoes.find((item) => item.id == id);
  console.log(promocaoEditada);

  // Função para salvar os dados do form
  function salvar(dados) {
    // Se promocaoEditada existe, mudar os dados e gravar no localStorage
    if (promocaoEditada) {
      Object.assign(promocaoEditada, dados);
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem("promocoes", JSON.stringify(promocoes));
    } else {
      // se promocaoEditada não existe, é criação de um novo produto
      // gerar um ID (Identificador único)
      dados.id = v4();
      // Adiciona o novo produto na lista de promoções
      promocoes.push(dados);
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem("promocoes", JSON.stringify(promocoes));
    }

    alert("Produto em promoção salvo com sucesso!");
    router.push("/promocoes");
  }

  // Campos do formulário e valores iniciais (default)
  const initialValues = {
    nome: "",
    descricao: "",
    categoria: "",
    precoOriginal: "",
    precoComDesconto: "",
    estoque: "",
    disponibilidade: true,
    imagem: "",
    dataLancamento: "",
  };

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    descricao: Yup.string().required("Campo obrigatório"),
    categoria: Yup.string().required("Campo obrigatório"),
    precoOriginal: Yup.number()
      .required("Campo obrigatório")
      .positive("Preço inválido")
      .min(0, "Preço não pode ser negativo"),
    precoComDesconto: Yup.number()
      .required("Campo obrigatório")
      .positive("Preço inválido")
      .min(0, "Preço com desconto não pode ser negativo"),
    estoque: Yup.number()
      .required("Campo obrigatório")
      .min(0, "Estoque não pode ser negativo"),
    disponibilidade: Yup.boolean().required("Campo obrigatório"),
    imagem: Yup.string().url("URL inválida").required("Campo obrigatório"),
    dataLancamento: Yup.date().required("Campo obrigatório"),
  });

  return (
    <Pagina titulo={"Cadastro de Promoção"}>
      {/* Formulário */}

      <Formik
        // Atributos do formik
        // Se for edição, coloca os dados de promocaoEditada
        // Se for novo, coloca o initialValues com os valores vazios
        initialValues={promocaoEditada || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {/* Construção do template do formulário */}
        {
          // os valores e funções do formik
          ({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => {
            // retorno com o template jsx do formulário
            return (
              <Form onSubmit={handleSubmit}>
                {/* Campos do formulário */}
                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>Nome do Produto:</Form.Label>
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
                    <Form.Label>Categoria:</Form.Label>
                    <Form.Select
                      name="categoria"
                      value={values.categoria}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.categoria && !errors.categoria}
                      isInvalid={touched.categoria && errors.categoria}
                    >
                      <option value="">Selecione</option>
                      {categorias.map((categoria) => (
                        <option key={categoria} value={categoria}>
                          {categoria}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.categoria}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Preço Original:</Form.Label>
                    <Form.Control
                      name="precoOriginal"
                      type="number"
                      value={values.precoOriginal}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.precoOriginal && !errors.precoOriginal}
                      isInvalid={touched.precoOriginal && errors.precoOriginal}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.precoOriginal}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>Preço com Desconto:</Form.Label>
                    <Form.Control
                      name="precoComDesconto"
                      type="number"
                      value={values.precoComDesconto}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        touched.precoComDesconto && !errors.precoComDesconto
                      }
                      isInvalid={
                        touched.precoComDesconto && errors.precoComDesconto
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.precoComDesconto}
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
                      isValid={
                        touched.disponibilidade && !errors.disponibilidade
                      }
                      isInvalid={
                        touched.disponibilidade && errors.disponibilidade
                      }
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

                  <Form.Group as={Col}>
                    <Form.Label>Data de Lançamento:</Form.Label>
                    <Form.Control
                      name="dataLancamento"
                      type="date"
                      value={values.dataLancamento}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.dataLancamento && !errors.dataLancamento}
                      isInvalid={
                        touched.dataLancamento && errors.dataLancamento
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.dataLancamento}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                {/* Botões */}
                <Form.Group className="text-end">
                  <Button className="me-2" href="/promocoes">
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
