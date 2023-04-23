import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { createContext, useState } from 'react';
import Onboard from './pages/Onboard/Onboard';

const AuthContext = createContext('');
// USE URL with # like http://localhost:3000/#/login
function App() {
  const [auth, setAuth] = useState('');
  return (
    <div className="App">
      <AuthContext.Provider value={auth}>
        <Routes>
            <Route index element={<Dashboard />} />

            <Route path="/login" element={<Login setAuth={setAuth} />} />
            <Route path="/register" element={<Register setAuth={setAuth} />} />
            <Route path="/onboard" element={<Onboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}
export {AuthContext};
export default App;

