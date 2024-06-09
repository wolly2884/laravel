import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import SignIn from './screens/SignIn';

import Produto from './Produto';
import Show from './Produto/show';
import Store from './Produto/store';
import Update from './Produto/update';
import Delete from './Produto/delete';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/"                   element={<Home    />} />
          <Route path="/SignIn"             element={<SignIn  />} />
          <Route path="/Produto"            element={<Produto />} />
          <Route path="/Produto/:id"        element={<Show    />} />
          <Route path="/ProdutoCreate"      element={<Store   />} />
          <Route path="/ProdutoUpdate/:id"  element={<Update  />} />
          <Route path="/ProdutoDelete/:id"  element={<Delete  />} />
      </Routes>
    </Router>
  );
}

export default App;
