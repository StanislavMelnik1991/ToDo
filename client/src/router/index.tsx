import { Route, Link, Routes } from 'react-router-dom';
import { Main } from '../components/Main';

export const Routers = () => {
  return (
  <Routes>
    <Route path='/' element={<Main />} />
  </Routes>
  );
};
