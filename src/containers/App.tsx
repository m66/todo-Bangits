import Router from '../routes/Router';
import { Layout, Space } from 'antd';

import Header from '../components/ui/Header/Header';

import './App.scss';

function App() {
  
  return (
    <div className="App">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Layout>
          <Header />
          <Router />
        </Layout>
      </Space>
    </div>
  );
}

export default App;
