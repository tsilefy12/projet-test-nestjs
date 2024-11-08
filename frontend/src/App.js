import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import LoginForm from './components/Login/LoginForm';
import RegisterForm from './components/Register/RegisterForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddArticle from './components/Article/addArticle/addArticle';
import TableArticle from './components/Article/tableArticel/tableArticle';
import EditArticle from './components/Article/edit/editArticle';

function App() {
  return (
    <Provider store={store}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Router>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/articles/add" element={<AddArticle />} />
            <Route path="/articles" element={<TableArticle />} />
            <Route path="/article/edit/:id" element={<EditArticle />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
