import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lobby from './components/Lobby';
import CodeBlock from './components/CodeBlock';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Lobby/>} />
          <Route path="/code/:id" element={<CodeBlock/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
