import { Flex, Layout, Table } from 'antd';
import { Link } from 'react-router-dom';
import { LeftCircleOutlined } from '@ant-design/icons';

import './historyPage.scss'

const { Content } = Layout;

const HistoryPage = () => {
  const columns = [
    {
      key: '1',
      title: '#',
      dataIndex: 'id',
    },
    {
      key: '2',
      title: 'Task Name',
      dataIndex: 'title',
    },
    {
      key: '3',
      title: 'Created Time',
      dataIndex: 'createdTime',
    },
    {
      key: '4',
      title: 'Finished Time',
      dataIndex: 'finishedTime',
    },
    {
      key: '5',
      title: 'Is Exist',
      dataIndex: 'isExist',
    },
  ];
  return (
    <Content>
      <Flex className="headLine" justify="space-between" align="center">
        <Flex align="center">
          <Link to="/">
            <LeftCircleOutlined className="goBackBtn" />
          </Link>
          <h1>History Page</h1>
        </Flex>
      </Flex>
      <Table columns={columns}></Table>
    </Content>
  );
};

export default HistoryPage;
