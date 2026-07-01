import { useState, useEffect } from 'react';
import './Donors.css';

function Donors() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBloodGroup, setFilterBloodGroup] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/donars')
      .then(res => res.json())
      .then(data => {
        setDonors(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching donors:', err);
        setLoading(false);
      });
  }, []);

  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBloodGroup = !filterBloodGroup || donor.bloodGroup === filterBloodGroup;
    return matchesSearch && matchesBloodGroup;
  });

  return (
    <div className="donors-container">
      <div className="donors-header">
        <h1 className="donors-title">Blood Donors</h1>
        <p className="donors-subtitle">Find donors in your area</p>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name, city, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-box">
          <select
            value={filterBloodGroup}
            onChange={(e) => setFilterBloodGroup(e.target.value)}
            className="filter-select"
          >
            <option value="">All Blood Groups</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading donors...</p>
        </div>
      ) : filteredDonors.length === 0 ? (
        <div className="empty-state">
          <p>No donors found matching your criteria.</p>
        </div>
      ) : (
        <div className="donors-grid">
          {filteredDonors.map((donor) => (
            <div key={donor._id} className="donor-card">
              <div className="donor-header">
                <div className="donor-avatar">
                  {donor.name?.charAt(0).toUpperCase()}
                </div>
                <div className="donor-info">
                  <h3 className="donor-name">{donor.name}</h3>
                  <span className="blood-badge">{donor.bloodGroup}</span>
                </div>
              </div>

              <div className="donor-details">
                <div className="detail-item">
                  <span className="detail-label">📍</span>
                  <span className="detail-value">{donor.city}, {donor.state}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">📧</span>
                  <span className="detail-value">{donor.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">📞</span>
                  <span className="detail-value">{donor.phone}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">🎂</span>
                  <span className="detail-value">{new Date(donor.DOB).toLocaleDateString()}</span>
                </div>
              </div>

              <button className="contact-btn">Contact Donor</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Donors;
