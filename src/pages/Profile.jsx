import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios.get("/api/students", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      setStudent(response.data);
    })
    .catch(error => {
      console.error("Ошибка загрузки профиля:", error);
      localStorage.removeItem("token");
      navigate("/login");
    });
  }, [navigate, token]);

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {student ? (
        <div>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Enrolled Courses:</strong> {student.courses.join(", ")}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={() => navigate("/")}>🏠 Home</button>
      <button 
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }} 
        className="logout-button"
      >
        🚪 Logout
      </button>
    </div>
  );
};

export default Profile;
