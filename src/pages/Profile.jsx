import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Установка базового URL для всех запросов
axios.defaults.baseURL = 'http://localhost:7070';

export default function Profile() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState({ email: '', password: '' });
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    axios.get('/api/students', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => setStudent(response.data))
      .catch(error => console.error('Error fetching student:', error));
  }, [token, navigate]);

  const handleEdit = () => {
    setEditMode(true);
    setUpdatedData({
      email: student?.email || '',
      password: ''
    });
  };

  const handleSave = () => {
    axios.put('/api/students', updatedData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setStudent(response.data);
        setEditMode(false);
      })
      .catch(error => console.error('Error updating student:', error));
  };

  if (!student) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-container">
      <h1>Student Profile</h1>
      <div className="profile-details">
        <p><strong>ID:</strong> {student.id}</p>
        {editMode ? (
          <>
            <p>
              <strong>Email:</strong>
              <input
                type="email"
                value={updatedData.email}
                onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })}
              />
            </p>
            <p>
              <strong>Password:</strong>
              <input
                type="password"
                value={updatedData.password}
                onChange={(e) => setUpdatedData({ ...updatedData, password: e.target.value })}
                placeholder="Enter new password"
              />
            </p>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <>
            <p><strong>Email:</strong> {student.email}</p>
            <button onClick={handleEdit}>Edit</button>
          </>
        )}
      </div>
      <button onClick={handleDelete} className="delete-button">Delete Account</button>
      <button onClick={() => navigate('/home')}>Back to Home</button>
    </div>
  );
}
