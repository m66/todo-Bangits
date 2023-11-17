import { Route, Routes } from 'react-router-dom';

import MainPage from '../Pages/MainPage/MainPage';
import TrashPage from '../Pages/TrashPage/TrashPage';
import NotFoundPage from '../Pages/NotFoundPage/NotFoundPage';

const Router = () => {

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/trash" element={<TrashPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
