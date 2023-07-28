import { useEffect, useState } from 'react';
import {
  Layout, Row, Col, Table, Modal, Button, Space, Popconfirm,
} from 'antd';
import axios from 'axios';
import {
  BorderOutlined,
  DeleteOutlined, FilePdfOutlined, FormOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


const { Content } = Layout;
const { Column } = Table;

function ListaAlunos() {
  const navigate = useNavigate();
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(false);

  const requestAlunos = async () => {
    try {
      setLoading(true);

      const response = await axios.get('/alunos');

      const { data } = response;

      setAlunos(data);

    } catch (error) {
      console.warn(error);
      Modal.error({
        title: 'Não foi possível carregar suas tarefas, tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestAlunos();
  }, []);

  const removeStudent = async (studentId) => {
    try {
      setLoading(true);

      await axios.delete(`/alunos/${studentId}`);

      const novoDado = [...alunos];
      const index = novoDado.findIndex((aluno) => aluno.id === studentId);

      novoDado.splice(index, 1);

      setAlunos(novoDado);

    } catch (error) {
      console.warn(error);
      Modal.error({
        title: 'Não foi possível processar, tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#ffffff',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

  const requestStudent = async (studentId) => {
    try {
      setLoading(true);

      const response = axios.get(`/alunos/${studentId}`);

      const { data } = response;

      setAlunos(data);
    } catch (error) {
      console.warn(error);
      Modal.error({
        title: 'Não foi possível processar, tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
    useEffect(() => {
      requestStudent();
    }, []);
  };
  // Function to generate PDF content
  const generatePdfContent = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>ID</Text>
          {alunos.map((student) => (
            <Text key={student.id}>{student.id}</Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text>NOME</Text>
          {alunos.map((student) => (
            <Text key={student.id}>{student.nome}</Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text>E-MAIL</Text>
          {alunos.map((student) => (
            <Text key={student.id}>{student.email}</Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text>IDADE</Text>
          {alunos.map((student) => (
            <Text key={student.id}>{student.idade}</Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text>SEXO</Text>
          {alunos.map((student) => (
            <Text key={student.id}>{student.sexo}</Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text>PESO</Text>
          {alunos.map((student) => (
            <Text key={student.id}>{student.peso}</Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text>ALTURA</Text>
          {alunos.map((student) => (
            <Text key={student.id}>{student.altura}</Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text>IMC</Text>
          {alunos.map((student) => (
            <Text key={student.id}>{student.imc}</Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text>CLASSIFICAÇÃO</Text>
          {alunos.map((student) => (
            <Text key={student.id}>{student.classificacao}</Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text>AVALIAÇÃO</Text>
          {alunos.map((student) => (
            <Text key={student.id}>{student.avaliacao}</Text>
          ))}
        </View>

        {/* Add more columns as needed */}
      </Page>
    </Document>
  );

  const handlePdfDownload = () => {
    const pdfContent = generatePdfContent();
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    // Cria um link temporário para o arquivo PDF
    const link = document.createElement('a');
    link.href = url;
    link.download = 'alunos.pdf';
    document.body.appendChild(link);
    link.click();

    // Limpa o link e o arquivo PDF da memária
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderActions = (aluno) => (
    <Button.Group>
      <Button
        onClick={() => {
          navigate(`/students/${aluno.id}`);
        }}
        icon={<FormOutlined />}
      />
      <Popconfirm
        title="Deseja excluir o aluno?"
        okText="Sim, excluir"
        cancelText="Não, cancelar"
        onConfirm={() => {
          removeStudent(aluno.id);
        }}
      >
        <Button
          icon={<DeleteOutlined />}
        />
      </Popconfirm>
    </Button.Group>
  );

  return (
    <Content>
      <br />
      <Space direction="vertical" style={{ display: 'flex' }}>

        <Row justify="center">
          <Col span={23}>

            <Table
              dataSource={alunos}
              pagination
              loading={loading}
              rowKey={(students) => students.id}
            >
              <Column
                title="ID"
                dataIndex="id"
                key="id"
              />
              <Column
                title="NOME"
                dataIndex="nome"
                key="nome"
              />
              <Column
                title="SEXO"
                dataIndex="sexo"
                key="sexo"
              />
              <Column
                title="IDADE"
                dataIndex="idade"
                key="idade"
              />
              <Column
                title="PESO"
                dataIndex="peso"
                key="peso"
              />
              <Column
                title="ALTURA"
                dataIndex="altura"
                key="altura"
              />
              <Column
                title="IMC"
                dataIndex="imc"
                key="imc"
              />
              <Column
                title="CLASSIFICAÇÃO"
                dataIndex="classificacao"
                key="classificacao"
              />
              <Column
                title='AVALIAÇÃO'
                dataIndex='avaliacao'
                key='avaliacao'
              />
              <Column
                title="Ações"
                key="acoes"
                render={renderActions}
              />
            </Table>
          </Col>
        </Row>
        <Button type="primary" icon={<BorderOutlined />}>
          <PDFDownloadLink document={generatePdfContent()} fileName="alunos.pdf">
            {({ blob, url, loading, error }) => (loading ? 'Carregando...' : 'Gerar PDF')}
          </PDFDownloadLink>
        </Button>
      </Space>
    </Content>
  );
}

export default ListaAlunos;
