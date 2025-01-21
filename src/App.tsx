import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Analytics from 'components/Analytics';
import Main from 'components/Main';

import 'normalize.css/normalize.css';
import './styles/common.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/analytics' element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
