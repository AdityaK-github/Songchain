import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ContractProvider } from './utility/ContractProvider';
import Upload from './components/upload';
import MyNFTs from './components/MyNFTs';

const App = () => {
    return (
        <ContractProvider>
          <Router>
            <Routes>
              <Route path="/" element={<MyNFTs />}></Route>
              <Route path="/upload" element={<Upload/>}></Route>
            </Routes>
          </Router>
        </ContractProvider>
    );
};

export default App;
