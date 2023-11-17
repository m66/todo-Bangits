import { Route, Routes } from 'react-router-dom';

import MainPage from '../Pages/MainPage/MainPage';
import TrashPage from '../Pages/TrashPage/TrashPage';
import HistoryPage from '../Pages/HistoryPage/HistoryPage';
import NotFoundPage from '../Pages/NotFoundPage/NotFoundPage';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/trash" element={<TrashPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
