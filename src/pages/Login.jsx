import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:7070/api/students/login', {
        email,
        password,
      });
      alert('Login successful');
      localStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-800">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 relative">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
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
        <div className="flex justify-between items-center mb-4">
          <div>
            <input type="checkbox" id="rememberMe" className="mr-2" />
            <label htmlFor="rememberMe" className="text-sm text-gray-600">Remember me</label>
          </div>
          {/* <button
            className="text-blue-500 text-sm hover:underline"
            onClick={() => alert('Forgot Password functionality is not implemented yet!')}
          >
            Forgot password?
          </button> */}
        </div>
        <button 
          onClick={handleLogin} 
          className="w-full bg-purple-500 text-white py-3 rounded hover:bg-purple-600"
        >
          Login Now
        </button>
        <div className="text-center mt-4">
          <span className="text-gray-600">Not a member? </span>
          <button 
            onClick={() => navigate('/')}
            className="text-blue-500 hover:underline"
          >
            Signup Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
