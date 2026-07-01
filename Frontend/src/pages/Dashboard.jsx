import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/dashboard/stats')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch stats');
        return res.json();
      })
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('API Error:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">Overview of blood donation statistics</p>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading statistics...</p>
        </div>
      ) : stats ? (
        <>
          <div className="stats-overview">
            <div className="stat-card-large primary">
              <div className="stat-icon-large">🩸</div>
              <div className="stat-content">
                <h3 className="stat-number-large">{stats.totalDonors || 0}</h3>
                <p className="stat-label-large">Total Donors</p>
              </div>
            </div>
            <div className="stat-card-large secondary">
              <div className="stat-icon-large">🏥</div>
              <div className="stat-content">
                <h3 className="stat-number-large">{stats.totalRequests || 0}</h3>
                <p className="stat-label-large">Blood Requests</p>
              </div>
            </div>
            <div className="stat-card-large success">
              <div className="stat-icon-large">✅</div>
              <div className="stat-content">
                <h3 className="stat-number-large">{stats.completedDonations || 0}</h3>
                <p className="stat-label-large">Completed Donations</p>
              </div>
            </div>
            <div className="stat-card-large accent">
              <div className="stat-icon-large">❤️</div>
              <div className="stat-content">
                <h3 className="stat-number-large">{stats.livesSaved || 0}</h3>
                <p className="stat-label-large">Lives Saved</p>
              </div>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3 className="card-title">Recent Activity</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-dot"></div>
                  <p>New donor registered today</p>
                </div>
                <div className="activity-item">
                  <div className="activity-dot"></div>
                  <p>Blood request completed</p>
                </div>
                <div className="activity-item">
                  <div className="activity-dot"></div>
                  <p>Emergency request received</p>
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <h3 className="card-title">Quick Actions</h3>
              <div className="action-buttons">
                <button className="action-btn" onClick={() => navigate('/donors')}>Find Donors</button>
                <button className="action-btn" onClick={() => navigate('/request-blood')}>Create Request</button>
                <button className="action-btn" onClick={() => navigate('/donate')}>View Profile</button>
                <button className="action-btn" onClick={() => navigate('/dashboard')}>Settings</button>
              </div>
            </div>

            <div className="dashboard-card full-width">
              <h3 className="card-title">Blood Group Distribution</h3>
              <div className="blood-groups">
                <div className="blood-group-item">
                  <span className="blood-type">A+</span>
                  <div className="progress-bar"><div className="progress-fill" style={{width: '35%'}}></div></div>
                  <span className="percentage">35%</span>
                </div>
                <div className="blood-group-item">
                  <span className="blood-type">B+</span>
                  <div className="progress-bar"><div className="progress-fill" style={{width: '28%'}}></div></div>
                  <span className="percentage">28%</span>
                </div>
                <div className="blood-group-item">
                  <span className="blood-type">O+</span>
                  <div className="progress-bar"><div className="progress-fill" style={{width: '22%'}}></div></div>
                  <span className="percentage">22%</span>
                </div>
                <div className="blood-group-item">
                  <span className="blood-type">AB+</span>
                  <div className="progress-bar"><div className="progress-fill" style={{width: '15%'}}></div></div>
                  <span className="percentage">15%</span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="error-container">
          <p>Failed to load statistics. Please try again later.</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;