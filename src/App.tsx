import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import Main from 'components/Main';

import 'normalize.css/normalize.css';
import './styles/common.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Main />
  </StrictMode>,
);
