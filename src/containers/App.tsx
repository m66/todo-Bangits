import { Layout, Space } from 'antd';

import Router from '../routes/Router';
import Header from '../components/ui/Header/Header';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Space direction="vertical" className="space">
        <Layout>
          <Header />
          <Router />
        </Layout>
      </Space>
    </div>
  );
}

export default App;
