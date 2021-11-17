import { MstContext, processViewKindOverride, RankedTester, rankWith, uiTypeIs } from '@agentlab/ldkg-ui-react';
import { SparqlClientImpl } from '@agentlab/sparql-jsld-client';
import { Button, Divider, Form, Input, InputNumber, Modal } from 'antd';
import React, { useContext, useState } from 'react';
import uuid62 from 'uuid62';

const client = new SparqlClientImpl('https://rdf4j.agentlab.ru/rdf4j-server');
client.setRepositoryId('mktp-schema');

export const DialogButtonRenderer: React.FC<any> = (props) => {
  const { store } = useContext(MstContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { viewKind, viewDescr, form, enabled } = props;

  const [formRef] = Form.useForm();

  const [id, collIri, collIriOverride, inCollPath, viewKindElement, viewDescrElement] = processViewKindOverride(
    props,
    store,
  );
  const style = viewKindElement.options?.style;

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
    //const client = getEnv(store).client;
    //console.log('CCCLIENT', client);

    const vals = formRef.getFieldsValue();
    formRef.resetFields();
    let uud = '_' + uuid62.v4();
    const catIri = `https://www.1688.com/categories/${uud}`;
    const q1 = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX als: <https://www.1688.com/schema#>
    INSERT DATA {
      GRAPH  <https://mktp.agentlab.ru/data/ali/hierarchy> {
        <${catIri}> rdf:type als:Category ;
          rdf:type als:Query ;
          als:name '${vals.categryName}' ;
          als:nameCn '' ;
          als:description '' .
      }
    }`;
    console.log(q1);
    const results1 = client.sparqlUpdate(q1);
    console.log('q1 resp', results1);

    uud = '_' + uuid62.v4();
    const jobIri = `https://www.1688.com/jobs/${uud}`;
    const q2 = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX mktp: <https://mktp.agentlab.ru/onto/mktp#>
    INSERT DATA {
      GRAPH  <https://mktp.agentlab.ru/data/mktp> {
        <${jobIri}> rdf:type mktp:ScraperJob ;
          mktp:category <${catIri}> ;
          mktp:minPrice ${vals.minPrice} ;
          mktp:maxPrice ${vals.minPrice} ;
          mktp:minVol ${vals.minVol} ;
          mktp:maxVol ${vals.maxVol} ;
          mktp:prodTitle '${vals.prodTitle || ''}' ;
          mktp:limit ${vals.limit} .
      }
    }`;
    console.log(q2);
    const results2 = client.sparqlUpdate(q2);
    console.log('q2 resp', results2);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'row', margin: '10px 52px 0 0' }}>
      <Button type='primary' onClick={showModal}>
        Добавить запрос
      </Button>
      <div style={{ display: 'block', margin: '0' }}>
        <Modal
          title='Добавить запрос для мониторинга 1688'
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}>
          <Form
            form={formRef}
            name='basic'
            labelCol={{ xs: { span: 24 }, sm: { span: 8 } }}
            wrapperCol={{ xs: { span: 24 }, sm: { span: 14 } }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            preserve={false}>
            <Form.Item
              label='Название запроса'
              tooltip='Название, под которым результаты будут отображаться в дереве категорий товара 1688'
              initialValue={'Запрос 1'}
              name='categryName'
              rules={[{ required: true, message: 'Введите название запроса' }]}>
              <Input />
            </Form.Item>

            <Divider plain>Параметры товара</Divider>

            <Form.Item
              label='Цена товара, юань'
              tooltip='Минимальная и максимальная цены товара в юанях'
              style={{ marginBottom: 0 }}>
              <Form.Item
                name='minPrice'
                rules={[{ required: true, message: 'Введите минимальную цену товара!' }]}
                style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}
                initialValue={0}>
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
              <span style={{ display: 'inline-block', width: '20px', lineHeight: '32px', textAlign: 'center' }}>-</span>
              <Form.Item
                name='maxPrice'
                initialValue={250}
                rules={[{ required: true, message: 'Введите максимальную цену товара!' }]}
                style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}>
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Form.Item>

            <Form.Item
              label='Объем продаж на 30 дней'
              tooltip='Минимальный и максимальный объем продаж товара в шт или кв. метрах'
              style={{ marginBottom: 0 }}>
              <Form.Item
                name='minVol'
                rules={[{ required: true, message: 'Введите минимальный объем продаж!' }]}
                style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}
                initialValue={10000}>
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
              <span style={{ display: 'inline-block', width: '20px', lineHeight: '32px', textAlign: 'center' }}>-</span>
              <Form.Item
                name='maxVol'
                initialValue={100000}
                rules={[{ required: true, message: 'Введите максимальный объем продаж!' }]}
                style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}>
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Form.Item>

            <Form.Item
              label='Макс. кол-во карточек'
              tooltip='Ограничение на максимальное число карточек на обработку'
              name='limit'
              initialValue={30}
              rules={[{ required: true, message: 'Введите максимальное количество карточек!' }]}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              label='Название товара'
              name='prodTitle'
              tooltip='Фрагмент строки в названии для поиска на английском и/или китайском'>
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export const antdDialogButtonControlTester: RankedTester = rankWith(2, uiTypeIs('aldkg:DialogButton'));
