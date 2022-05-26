import './App.css';
import { Routes, Route, Link } from "react-router-dom";

import { Home } from './components/Home';
import { Register } from './components/Register';
import { Login } from './components/Login';
// import Register from './components/Register';
// import Login from './components/Login';

function App() {
  return (
    <div className='App'>
      {/* <h1>Welcome to React Router!</h1> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
