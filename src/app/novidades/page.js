"use client";

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row, Carousel } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";

export default function NovidadeFormPage(props) {
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

  // Buscar a lista de produtos no localStorage, se não existir, inicializa uma lista vazia
  const novidades = JSON.parse(localStorage.getItem("novidades")) || [];

  // Recuperando id para edição
  const id = props.searchParams.id;
  console.log(props.searchParams.id);

  // Buscar na lista o produto com o ID recebido no parametro
  const novidadeEditada = novidades.find((item) => item.id == id);
  console.log(novidadeEditada);

  // Função para salvar os dados do form
  function salvar(dados) {
    // Se novidadeEditada existe, mudar os dados e gravar no localStorage
    if (novidadeEditada) {
      Object.assign(novidadeEditada, dados);
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem("novidades", JSON.stringify(novidades));
    } else {
      // se novidadeEditada não existe, é criação de um novo produto
      // gerar um ID (Identificador único)
      dados.id = v4();
      // Adiciona o novo produto na lista de novidades
      novidades.push(dados);
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem("novidades", JSON.stringify(novidades));
    }

    alert("Produto salvo com sucesso!");
    router.push("/novidades");
  }

  // Campos do formulário e valores iniciais (default)
  const initialValues = {
    nome: "",
    descricao: "",
    categoria: "",
    preco: "",
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
    preco: Yup.number()
      .required("Campo obrigatório")
      .positive("Preço inválido")
      .min(0, "Preço não pode ser negativo"),
    estoque: Yup.number()
      .required("Campo obrigatório")
      .min(0, "Estoque não pode ser negativo"),
    disponibilidade: Yup.boolean().required("Campo obrigatório"),
    imagem: Yup.string().url("URL inválida").required("Campo obrigatório"),
    dataLancamento: Yup.date().required("Campo obrigatório"),
  });

  return (
    <Pagina titulo={"Cadastro de Novidades"}>
      {/* Carrossel de imagens */}
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://semprelindaloja.com.br/wp-content/uploads/2023/02/semprelindaloja_com_br-vestido-longo-laura-verde-jade-copia.jpg"
            alt="Imagem 1"
            style={{ objectFit: "cover", height: "430px" }} // Garantir que as imagens fiquem do mesmo tamanho
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://down-br.img.susercontent.com/file/sg-11134201-22110-9iu5mw5le1jv96"
            alt="Imagem 2"
            style={{ objectFit: "cover", height: "430px" }} // Garantir que as imagens fiquem do mesmo tamanho
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://down-br.img.susercontent.com/file/br-11134201-23010-wnb4e9flx0lv88"
            alt="Imagem 3"
            style={{ objectFit: "cover", height: "430px" }} // Garantir que as imagens fiquem do mesmo tamanho
          />
        </Carousel.Item>
      </Carousel>

      {/* Formulário */}
      <Formik
        initialValues={novidadeEditada || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
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
                    <Form.Label>Preço:</Form.Label>
                    <Form.Control
                      name="preco"
                      type="number"
                      value={values.preco}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.preco && !errors.preco}
                      isInvalid={touched.preco && errors.preco}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.preco}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-2">
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
                  <Button className="me-2" href="/novidades">
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
