import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import '../index.css';

const SHARED_COMPETENCIES = [
  'Database Engineering',
  'API & Data Analytics Development',
  'Data Visualization & RESTful Development',
  'Cognitive Workflow Architecture',
  'Foundational Knowledge',
  'Analytical Learning Methodology',
  'Core Programming Proficiency',
  'Software Development Excellence',
  'Strategic Personal Mastery',
  'Collaborative Communication Excellence',
  'Spring-based Application Development',
  'Strategic Leadership'
];

const COURSES = [
  {
    id: 1,
    name: 'Programming Languages',
    uniqueCompetences: [
      'Aggregate large datasets',
      'Evaluate visualization methods',
      'Visualize data',
      'Fulfill technical requirements'
    ]
  },
  {
    id: 2,
    name: 'Web Programming',
    uniqueCompetences: [
      'Familiarity with HTML and CSS',
      'Adaptability'
    ]
  },
  {
    id: 3,
    name: 'Software Engineering',
    uniqueCompetences: [
      'Creativity and Innovation',
      'Development of RESTful APIs'
    ]
  }
];

export default function Home() {
  const navigate = useNavigate();
  const [selectedCourses, setSelectedCourses] = useState({});
  const [courseScores, setCourseScores] = useState({});
  const [showChart, setShowChart] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const calculateCompetencyScores = () => {
    const sharedScore = Object.values(courseScores).length > 0 
      ? Object.values(courseScores).reduce((sum, score) => sum + Number(score), 0) / Object.values(courseScores).length
      : 0;

    const uniqueCompetencyScores = Object.entries(selectedCourses).flatMap(([boxIndex, course]) => {
      const score = courseScores[boxIndex] || 0;
      return course.uniqueCompetences.map(comp => ({
        competency: comp,
        score: Number(score)
      }));
    });

    return {
      labels: [
        'Shared Competencies',
        ...uniqueCompetencyScores.map(c => c.competency)
      ],
      data: [
        sharedScore,
        ...uniqueCompetencyScores.map(c => c.score)
      ]
    };
  };

  const handleCourseSelect = (boxIndex, course) => {
    setSelectedCourses(prev => ({
      ...prev,
      [boxIndex]: course
    }));
    setOpenDropdown(null);
  };

  const handleScoreChange = (boxIndex, score) => {
    if (score === '' || (Number(score) >= 1 && Number(score) <= 100)) {
      setCourseScores(prev => ({
        ...prev,
        [boxIndex]: score
      }));
    }
  };

  const downloadChart = () => {
    const canvas = document.querySelector('canvas');
    const link = document.createElement('a');
    link.download = 'chart.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const chartData = {
    labels: calculateCompetencyScores().labels,
    datasets: [{
      label: 'Competency Scores',
      data: calculateCompetencyScores().data,
      backgroundColor: [
        '#3B82F6',
        ...Array(20).fill().map(() => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`)
      ]
    }]
  };
  
  return (
    <div className="app-container">
      <header className="app-header">
        <img 
          src="/Ala-too_International_University_Seal.png" 
          alt="Ala-Too Logo" 
          className="logo"
        />
        <div className="header-icons">
          <img
            src="/free-icon-student-4211262.png"
            alt="Profile Icon"
            className="profile-icon"
            onClick={() => navigate('/profile')}
            style={{ cursor: 'pointer', width: '50px', height: '50px', marginLeft: '10px' }}
          />
          <button 
            onClick={() => navigate('/login')} 
            className="exit-button"
          >
            ↪️ Exit
          </button>
        </div>
      </header>

      <main className="app-main">
        <div className="course-selection">
          {[0, 1, 2].map((boxIndex) => (
            <div key={boxIndex} className="course-box">
              <div className="dropdown-container">
                <div
                  onClick={() => setOpenDropdown(openDropdown === boxIndex ? null : boxIndex)}
                  className="dropdown-trigger"
                >
                  <span>{selectedCourses[boxIndex]?.name || 'Select Course'}</span>
                  <span className="dropdown-arrow">▼</span>
                </div>
                
                {openDropdown === boxIndex && (
                  <div className="dropdown-menu">
                    {COURSES.filter(course => 
                      !Object.values(selectedCourses).some(selected => selected?.id === course.id)
                    ).map(course => (
                      <div
                        key={course.id}
                        className="dropdown-item"
                        onClick={() => handleCourseSelect(boxIndex, course)}
                      >
                        {course.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <input
                type="number"
                min="1"
                max="100"
                value={courseScores[boxIndex] || ''}
                onChange={(e) => handleScoreChange(boxIndex, e.target.value)}
                placeholder="Score"
                className="score-input"
              />
            </div>
          ))}
        </div>

        <button 
          onClick={() => setShowChart(true)}
          disabled={Object.keys(selectedCourses).length === 0}
          className="visualize-button"
        >
          Visualize
        </button>

        {showChart && (
          <div className="chart-container">
            <Bar 
              data={chartData}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100
                  }
                }
              }}
            />
            <button 
              onClick={downloadChart} 
              className="download-button"
            >
              Download Chart
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
