import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
    setError(""); // Очистить старую ошибку перед новой попыткой регистрации

    try {
      const response = await axios.post("http://localhost:7070/api/students/register", {
        email,
        password,
      });
      alert("Registration successful");
      navigate("/home");
    } catch (error) {
      setError(error.response ? error.response.data : "Registration failed");
      console.error("Registration failed:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      {/* Логотип вверху */}
      <div className="logo-container flex justify-center">
        <img
          src="/Ala-too_International_University_Seal.png"
          alt="Ala-Too Logo"
          className="w-24 h-24" // Вы можете изменить размер логотипа, например, на 96x96 (w-24 h-24)
        />
      </div>

      <h2>Register</h2>

      {error && <div className="error-message">{error}</div>}

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister} disabled={loading}>
        {loading ? "Registering..." : "Register Now"}
      </button>

      <p>
        Already have an account?{" "}
        <span onClick={() => navigate("/login")}>Login</span>
      </p>
    </div>
  );
}

export default Register;
