import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const fakeToken = "yourAuthToken"; 
      localStorage.setItem("token", fakeToken);
      onLogin?.(email, password);
      navigate('/profile');
    } catch (error) {
      alert("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Логотип вверху */}
      <div className="logo-container flex justify-center">
        <img
          src="/Ala-too_International_University_Seal.png"
          alt="Ala-Too Logo"
          className="w-24 h-24" // Размер логотипа
        />
      </div>

      <h2>Login</h2>
      <input 
        type="email" 
        placeholder="Enter your email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
      />

      <input 
        type="password" 
        placeholder="Enter your password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
      />
      
      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? "Signing In..." : "Sign In"}
      </button>
      
      <p>
        Don’t have an account? <span onClick={() => navigate("/register")}>Register</span>
      </p>
    </div>
  );
};

export default Login;
