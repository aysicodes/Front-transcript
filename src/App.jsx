import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-purple-200 flex items-center justify-center">
        {/* Логотип в левом верхнем углу */}
        <img
          src="/Ala-too_International_University_Seal.png"
          alt="Ala-Too Logo"
          className="absolute top-4 left-4 w-12 h-12"
        />

        {/* Основной контент с маршрутизацией */}
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
