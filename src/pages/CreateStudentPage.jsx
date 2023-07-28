import {
  Button,
  Col, Form, Modal, notification, Row, Space,
} from 'antd';
import { Content } from 'antd/es/layout/layout';
import axios from 'axios';
import { useEffect, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import InputText from '../components/InputText';
import { validateSex } from '../validatiors/tarefas';
import { validateEmail, validateName } from '../validatiors/usuarios';

function CreateStudentPage() {
  const { studentsId } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = useCallback((event) => {
    const { name, input } = event;

    setFormValues({
      ...formValues,
      [name]: input,
    });
  }, [formValues]);

  const requestAlunos = useCallback(async () => {
    try {
      setLoading(true);

      await axios.get(`/alunos/${studentsId}`);

      // const { data } = response;

      // setFormValues({
      //   titulo: {
      //     value: data.titulo,
      //     valid: true,
      //   }
      // });


    } catch (error) {
      console.warn(error);
      Modal.error({
        title: 'Não foi possível carregar a tarefa, tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  }, [studentsId]);

  useEffect(() => {
    if (studentsId) {
      requestAlunos();
    } else {
      setFormValues({});
    }
  }, [requestAlunos, studentsId]);

  const handleCreateStudent = useCallback(async () => {
    try {
      setLoading(true);

      const { nome, email, idade, sexo, peso, altura } = formValues;

      if (!nome?.valid || !email?.valid || !idade?.valid || !sexo?.valid || !peso?.valid || !altura?.valid) return;

      const body = {
        nome: nome.value,
        email: email.value,
        idade: idade.value,
        sexo: sexo.value,
        peso: peso.value,
        altura: altura.value,
      }

      if (studentsId) {
        await axios.patch(`/alunos/${studentsId}`, body);
      } else {
        await axios.post(`/alunos`, body);
      }

      notification.success({ message: 'Aluno salvo com sucesso!' });

      navigate('/students');

    } catch (error) {
      console.warn(error);
      Modal.error({
        title: 'Não foi possível cadastrar, tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  }, [formValues, navigate, studentsId]);

  return (
    <Content>
      <br />
      <Space direction="vertical" style={{ display: 'flex' }}>

        <Row justify="center">
          <Col xs={23} sl={14} md={12} lg={10} xl={8}>

            <Form layout="vertical">

              <InputText
                name="nome"
                label="Nome"
                size="large"
                onChange={handleInputChange}
                validate={validateName}
                disabled={loading}
                required
                value={formValues.nome?.value}
              />
              <InputText
                name="email"
                label="E-mail"
                size="large"
                onChange={handleInputChange}
                validate={validateEmail}
                disabled={loading}
                required
                value={formValues.email?.value}
              />
              <InputText
                name="idade"
                label="Idade"
                size="large"
                onChange={handleInputChange}
                disabled={loading}
                required
                value={formValues.idade?.value}
              />
              <InputText
                name="sexo"
                label="Sexo"
                size="large"
                onChange={handleInputChange}
                validate={validateSex}
                disabled={loading}
                required
                value={formValues.sexo?.value}
              />
              <InputText
                name="peso"
                label="Peso"
                size="large"
                onChange={handleInputChange}
                disabled={loading}
                required
                value={formValues.peso?.value}
              />
              <InputText
                name="altura"
                label="Altura"
                size="large"
                onChange={handleInputChange}
                disabled={loading}
                required
                value={formValues.altura?.value}
              />

              <Button
                block
                type="primary"
                size="large"
                onClick={handleCreateStudent}
                loading={loading}
              >
                Salvar
              </Button>
            </Form>

          </Col>
        </Row>
      </Space>
    </Content>
  );
}

export default CreateStudentPage;
