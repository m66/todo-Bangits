import { Layout, Flex } from 'antd';

import logo from '../../../assets/images/checklist.png';

import './header.scss';

const { Header } = Layout;
const headerStyle: React.CSSProperties = {
  height: '100%',
};

const MainHeader = () => {
  return (
    <Header>
      <Flex align="center" justify="flex-start" gap="middle" style={headerStyle}>
        <img src={logo} alt="ToDo Logo" />
        <h1>ToDo List</h1>
      </Flex>
    </Header>
  );
};

export default MainHeader;
