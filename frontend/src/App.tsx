import React from 'react';
import { Header } from './components/Header';
import { Outlet } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <div className="page">
      <Header />
      <Outlet />
    </div>
  );
};
