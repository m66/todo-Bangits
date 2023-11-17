import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './mainPage.scss';

import {
  Tag,
  Flex,
  Tour,
  Badge,
  Modal,
  Input,
  Table,
  Space,
  Layout,
  Button,
  Dropdown,
  Statistic,
  MenuProps,
  TourProps,
  DatePicker,
  CountdownProps,
  message
} from 'antd';
import {
  EditOutlined,
  SyncOutlined,
  DownOutlined,
  CheckOutlined,
  SearchOutlined,
  DeleteOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  OrderedListOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import type { RangePickerProps } from 'antd/es/date-picker';


import {
  addTodo,
  editTodo,
  deleteTodo,
  completeTodo,
  editStatusOverdue,
} from '../../redux/features/todos/todosSlice';
import { formSchema } from '../../schemas';
import { ITodoItem } from '../../interfaces/mainInterface';
import { toured } from '../../redux/features/isToured/isTouredSlice';
import { increment } from '../../redux/features/counter/counterSlice';
import { addToTrashedTodo } from '../../redux/features/trashedTodos/trashedTodosSlice';

const { Content } = Layout;
const dateFormat = 'DD/MM/YYYY';
const { Countdown } = Statistic;

// const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

function MainPage() {
  const { todos } = useSelector((state: any) => state.todos);
  const { counter } = useSelector((state: any) => state.counter);
  const { isToured } = useSelector((state: any) => state.isToured);
  const { trashedTodos } = useSelector((state: any) => state.trashedTodos);
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState('');
  const [fliteredStatusText, setFliteredStatusText] = useState('all');
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const addFormik = useFormik({
    initialValues: {
      title: '',
      description: '',
      deadline: '',
    },
    onSubmit: () => {
      dispatch(increment());
      dispatch(
        addTodo({
          id: counter,
          status: 'pending',
          ...addFormik.values,
        })
      );
      onCancelAdding();
    },
    validationSchema: formSchema,
  });

  const editFormik = useFormik({
    initialValues: {
      id: null,
      title: '',
      description: '',
      deadline: '',
      status: '',
    },
    onSubmit: () => {
      dispatch(
        editTodo({
          ...editFormik.values,
        })
      );
      onCancelEditing();
    },
    validationSchema: formSchema,
  });

  // Start of For Tour Component
  const [open, setOpen] = useState<boolean>(true);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const steps: TourProps['steps'] = [
    {
      title: 'Complete',
      description: 'Click to complete ToDo Item.',
      target: () => ref1.current,
    },
    {
      title: 'Edit',
      description: 'Click to edit ToDo Item.',
      target: () => ref2.current,
    },
    {
      title: 'Delete',
      description: 'Click to delete ToDo Item.',
      target: () => ref3.current,
    },
  ];

  const items: MenuProps['items'] = [
    {
      label: 'Show All',
      key: 'all',
      icon: <OrderedListOutlined />,
    },
    {
      label: 'Completed',
      key: 'completed',
      icon: <CheckCircleOutlined />,
    },
    {
      label: 'Pending',
      key: 'pending',
      icon: <ClockCircleOutlined />,
    },
    {
      label: 'Overdue',
      key: 'overdue',
      icon: <WarningOutlined />,
    },
    {
      label: 'Removed',
      key: 'removed',
      icon: <CloseCircleOutlined />,
    },
  ];
  // End of For Tour Component

  const onFinish: CountdownProps['onFinish'] = () => {
    message.info(`Filtered by ${fliteredStatusText}`);
  };

  function countDateDiff(dateStr: string) {
    const currentDate = dayjs();
    const deadline = dayjs(dateStr, dateFormat);
    const diffMs = Date.now() + deadline.diff(currentDate)
    
    return diffMs;
  }


  const columns = [
    {
      key: '1',
      title: '#ID',
      dataIndex: 'id',
      sorter: (a: any, b: any) => a.id - b.id,
    },
    {
      key: '2',
      title: 'Task Name',
      dataIndex: 'title',
    },
    {
      key: '3',
      title: 'Description',
      dataIndex: 'description',
      render: (description: string | undefined) =>
        description ? description : 'No Description',
    },
    {
      key: '4',
      title: 'Deadline',
      dataIndex: 'deadline',
      render: (deadline: string | undefined) =>
        deadline ? deadline : 'No Deadline',
    },

    {
      key: '5',
      title: 'Staying time',
      dataIndex: 'deadline',
      render: (deadline: string) => (<Countdown value={countDateDiff(deadline)} onFinish={onFinish} />) 
    },
    {
      key: '5',
      title: 'Status',
      render: (record: any) => {
        let elem;
        if (record.deadline) {
          const dif = calculateDateDifference(record.deadline) + 1;
          if (dif < 0) {
            // ????
            dispatch(
              editStatusOverdue({
                id: record.id,
              })
            );
          }
        }
        switch (record.status) {
          case 'completed':
            elem = (
              <Tag icon={<CheckCircleOutlined />} color="success">
                Completed
              </Tag>
            );
            break;
          case 'pending':
            elem = (
              <Tag icon={<SyncOutlined spin />} color="processing">
                Pending
              </Tag>
            );
            break;
          case 'overdue':
            elem = (
              <Tag icon={<ExclamationCircleOutlined />} color="warning">
                Overdue
              </Tag>
            );
            break;
          case 'removed':
            elem = (
              <Tag icon={<CloseCircleOutlined />} color="error">
                Removed
              </Tag>
            );
            break;
          default:
            elem = (
              <Tag icon={<CheckCircleOutlined />} color="success">
                Pending
              </Tag>
            );
            break;
        }

        return elem;
      },
    },
    {
      key: '5',
      title: 'Actions',
      render: (record: any) => (
        <>
          <CheckOutlined
            ref={ref1}
            className="addBtn"
            onClick={() => {
              onCompleted(record);
            }}
          />
          <EditOutlined
            ref={ref2}
            className="editBtn"
            onClick={() => {
              onEditTodo(record);
            }}
          />
          <DeleteOutlined
            ref={ref3}
            className="deleteBtn"
            onClick={() => {
              onDeleteTodo(record);
            }}
          />
          {!isToured && (
            <Tour
              open={open}
              onClose={() => {
                setOpen(false);
                dispatch(toured());
              }}
              steps={steps}
            />
          )}
        </>
      ),
    },
  ];

  // Disabled select passed date
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current < dayjs().endOf('day');
  };

  function onAddTodo() {
    setIsOpenAddModal(true);
  }

  function onDeleteTodo(record: any) {
    Modal.confirm({
      title: 'Are you sure to delete this todo item?',
      okText: 'Yes',
      cancelText: 'No',
      okType: 'danger',
      onOk: () => {
        dispatch(
          addToTrashedTodo({
            ...record,
            status: 'removed',
          })
        );

        dispatch(
          deleteTodo({
            id: record.id,
          })
        );
      },
    });
  }

  function onEditTodo(record: any) {
    setIsOpenEditModal(true);
    editFormik.setValues({
      ...record,
    });
  }

  function onCancelEditing() {
    setIsOpenEditModal(false);
    editFormik.resetForm();
  }

  function onCancelAdding() {
    setIsOpenAddModal(false);
    addFormik.resetForm();
  }

  function calculateDateDifference(dateString: string) {
    const targetDate = dayjs(dateString, 'DD/MM/YYYY');
    const currentDate = dayjs();
    const daysDifference = targetDate.diff(currentDate, 'day');

    return daysDifference;
  }


  
  // dropdown config for filtering data BY STATUS
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    // message.info(`Filtered by ${fliteredStatusText}`);
    setFliteredStatusText(e.key);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  function onCompleted(record: any) {
    dispatch(
      completeTodo({
        id: record.id,
      })
    );
  }

  return (
    <Content className="mainPage">
      <Flex gap="middle" align="center" justify="flex-end" className="headline">
        <Button type="primary" onClick={onAddTodo}>
          Add
        </Button>
        <Input
          className="searchInput"
          placeholder="Search by title"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          prefix={<SearchOutlined />}
        />
        <Dropdown menu={menuProps}>
          <Button>
            <Space>
              Filter by status
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        <Link to="/history">
          <Badge count={trashedTodos.length}>
            <Button type='dashed'>History</Button>
          </Badge>
        </Link>
        <Link to="/trash">
          <Badge count={trashedTodos.length}>
            <Button danger>Trash</Button>
          </Badge>
        </Link>
      </Flex>

      <Table
        columns={columns}
        dataSource={todos
          .filter((todo: ITodoItem) => {
            return todo.title.includes(searchText);
          })
          .filter((todo: ITodoItem) => {
            if (fliteredStatusText === 'all') {
              return todo;
            } else {
              return todo.status === fliteredStatusText;
            }
          })}
        // working not compitly correct for showing DESCRIPTION
        // expandable={{
        //   expandedRowRender: (record) => (
        //     <p style={{ margin: 0 }}>{record.description}</p>
        //   ),
        //   rowExpandable: (record) =>
        //     record.description !== undefined && record.description !== '',
        // }}
      ></Table>

      {/* Add modal */}
      <Modal
        title="Add ToDo Item"
        okText="Save"
        open={isOpenAddModal}
        onCancel={() => {
          onCancelAdding();
        }}
        onOk={() => {
          addFormik.handleSubmit();
        }}
      >
        <Input
          name="title"
          value={addFormik.values.title}
          className={addFormik.errors.title ? 'inputError' : ''}
          placeholder="Task Name"
          onChange={addFormik.handleChange}
          allowClear
        />
        {addFormik.errors.title && (
          <p className="error">{addFormik.errors.title}</p>
        )}
        <Input
          name="description"
          value={addFormik.values.description}
          className={`${
            addFormik.errors.description ? 'inputError' : ''
          } mt-10`}
          placeholder="Description"
          onChange={addFormik.handleChange}
          allowClear
        />
        {addFormik.errors.description && (
          <p className="error">{addFormik.errors.description}</p>
        )}

        <DatePicker
          format={dateFormat}
          value={
            addFormik.values.deadline
              ? dayjs(addFormik.values.deadline, dateFormat)
              : null
          }
          disabledDate={disabledDate}
          onChange={(date) => {
            addFormik.setFieldValue(
              'deadline',
              date ? date.format(dateFormat) : ''
            );
          }}
          className="mt-10"
          // className={addFormik.errors.deadline ? 'inputError': ''}
        />
      </Modal>

      {/* Edit modal */}
      <Modal
        title="Edit ToDo Item"
        okText="Save"
        open={isOpenEditModal}
        onCancel={() => {
          onCancelEditing();
        }}
        onOk={() => {
          editFormik.handleSubmit();
        }}
      >
        <Input
          name="title"
          value={editFormik.values.title}
          onChange={editFormik.handleChange}
          className={`${
            editFormik.errors.description ? 'inputError' : ''
          } mb-3`}
          allowClear
        />
        {editFormik.errors.title && (
          <p className="error">{editFormik.errors.title}</p>
        )}
        <Input
          name="description"
          value={editFormik.values.description}
          onChange={editFormik.handleChange}
          className={`${
            editFormik.errors.description ? 'inputError' : ''
          } mb-3`}
          allowClear
        />
        {editFormik.errors.description && (
          <p className="error">{editFormik.errors.description}</p>
        )}
        <DatePicker
          format={dateFormat}
          value={
            editFormik.values.deadline
              ? dayjs(editFormik.values.deadline, dateFormat)
              : null
          }
          disabledDate={disabledDate}
          onChange={(date) => {
            editFormik.setFieldValue(
              'deadline',
              date ? date.format(dateFormat) : ''
            );
          }}
        />
      </Modal>
    </Content>
  );
}

export default MainPage;
