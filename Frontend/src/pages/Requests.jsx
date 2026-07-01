import { useState, useEffect } from 'react';
import './Requests.css';

function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/request')
      .then(res => res.json())
      .then(data => {
        setRequests(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching requests:', err);
        setLoading(false);
      });
  }, []);

  const handleRespond = async (requestId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/request/${requestId}/respond`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setRequests(requests.filter(req => req._id !== requestId));
        alert('Request responded successfully!');
      } else {
        alert('Failed to respond to request');
      }
    } catch (err) {
      console.error('Error responding to request:', err);
      alert('Error connecting to server');
    }
  };

  return (
    <div className="requests-container">
      <div className="requests-header">
        <h1 className="requests-title">Blood Requests</h1>
        <p className="requests-subtitle">Help those in need of blood</p>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading requests...</p>
        </div>
      ) : requests.length === 0 ? (
        <div className="empty-state">
          <p>No blood requests at the moment.</p>
        </div>
      ) : (
        <div className="requests-grid">
          {requests.map((request) => (
            <div key={request._id} className="request-card">
              <div className="request-header">
                <div className="blood-group-large">{request.bloodGroup}</div>
                <div className="units-badge">{request.units} units needed</div>
              </div>

              <div className="request-details">
                <div className="patient-info">
                  <h3 className="patient-name">{request.patientName}</h3>
                  <p className="hospital-name">🏥 {request.hospitalName}</p>
                </div>

                <div className="request-meta">
                  <div className="meta-item">
                    <span className="meta-label">Contact Person:</span>
                    <span className="meta-value">{request.contactPerson}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Phone:</span>
                    <span className="meta-value">{request.phone}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Required Date:</span>
                    <span className="meta-value">
                      {new Date(request.requiredDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <button className="respond-btn" onClick={() => handleRespond(request._id)}>Respond to Request</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Requests;
