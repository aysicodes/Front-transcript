import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile'; // Импортируем компонент страницы профиля

function App() {
  return (
    <Router>
      <Routes>
        {/* Страница регистрации по умолчанию */}
        <Route path="/" element={<Register />} />

        {/* Страница логина */}
        <Route path="/login" element={<Login />} />

        {/* Главная страница */}
        <Route path="/home" element={<Home />} />

        {/* Страница профиля */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
