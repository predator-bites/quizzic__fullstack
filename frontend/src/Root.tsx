import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { lazy, Suspense } from 'react';
import Loader from './components/Loader/Loader';

const CreatePage = lazy(() => import('./pages/CreatePage/CreatePage'));
const DetailsPage = lazy(() => import('./pages/DetailsPage/DetailsPage'));
const HelloPage = lazy(() => import('./pages/HelloPage/HelloPage'));
const ListPage = lazy(() => import('./pages/ListPage/ListPage'));

export const Root = () => (
  <Router>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HelloPage />} />
          <Route path="create" element={<CreatePage />} />
          <Route path="quizzes" element={<ListPage />} />
          <Route path="quizzes/:id" element={<DetailsPage />} />
        </Route>
      </Routes>
    </Suspense>
  </Router>
);
