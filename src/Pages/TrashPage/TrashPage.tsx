import { Button, Flex, Popover, Table, Tag } from 'antd';
import {
  LeftCircleOutlined,
  ReloadOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import './trashPage.scss';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteAllTodos,
  deleteTodo,
} from '../../redux/features/trashedTodos/trashedTodosSlice';
import { addTodo } from '../../redux/features/todos/todosSlice';

const TrashPage = () => {
  const dispatch = useDispatch();
  const { trashedTodos } = useSelector((state: any) => state.trashedTodos);

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
      title: 'Deadline',
      dataIndex: 'deadline',
    },
    {
      key: '4',
      title: 'Status',
      render: () => (
        <Tag icon={<CloseCircleOutlined />} color="error">
          Removed
        </Tag>
      ),
    },
    {
      key: '5',
      title: 'Actions',
      render: (record: any) => (
        <>
          <Popover title="Restore Todo">
            <ReloadOutlined
              className="restoreBtn"
              onClick={() => {
                dispatch(
                  deleteTodo({
                    id: record.id,
                  })
                );
                dispatch(
                  addTodo({
                    ...record,
                  })
                );
              }}
            />
          </Popover>
          <Popover title="Delete Forever">
            <DeleteOutlined
              className="deleteBtn"
              onClick={() => {
                dispatch(
                  deleteTodo({
                    id: record.id,
                  })
                );
              }}
            />
          </Popover>
        </>
      ),
    },
  ];

  return (
    <div className="trashPage">
      <Flex className="headLine" justify="space-between" align="center">
        <Flex align="center">
          <Link to="/">
            <LeftCircleOutlined className="goBackBtn" />
          </Link>
          <h1>Trashed data</h1>
        </Flex>
        <Button
          onClick={() => {
            dispatch(deleteAllTodos());
          }}
          danger
        >
          Delete All
        </Button>
      </Flex>
      <Table columns={columns} dataSource={trashedTodos}></Table>
    </div>
  );
};

export default TrashPage;
