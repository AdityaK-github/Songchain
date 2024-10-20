import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ContractProvider } from './utility/ContractProvider';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContractProvider>
      <App />
    </ContractProvider>
  </StrictMode>
);
