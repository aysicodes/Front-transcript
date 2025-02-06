import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:7070/api/students/register', {
        email,
        password,
      });
      alert('Registration successful');
      navigate('/home');
    } catch (error) {
      console.error('Registration failed:', error.response ? error.response.data : error.message);
      alert('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-800">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded mb-4"
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded mb-6"
        />
        <button 
          onClick={handleRegister} 
          className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
        >
          Register Now
        </button>
        <div className="text-center mt-4">
          <span className="text-gray-600">Already have an account? </span>
          <button 
            onClick={() => navigate('/login')}
            className="text-blue-500 hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
