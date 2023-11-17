import { Layout, Flex } from 'antd';

import logo from '../../../assets/images/checklist.png';

import './header.scss';

const { Header } = Layout;

const MainHeader = () => {
  return (
    <Header>
      <Flex
        align="center"
        justify="flex-start"
        gap="middle"
        className='header'
      >
        <img src={logo} alt="ToDo Logo" />
        <h1>ToDo List</h1>
      </Flex>
    </Header>
  );
};

export default MainHeader;
