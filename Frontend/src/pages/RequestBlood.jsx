import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RequestBlood.css';

function RequestBlood() {
  const [formData, setFormData] = useState({
    patientName: '',
    bloodGroup: '',
    units: '',
    hospitalName: '',
    contactPerson: '',
    phone: '',
    requiredDate: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate('/requests');
      } else {
        const data = await response.text();
        setError(data || 'Request failed');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="request-container">
      <div className="request-card">
        <div className="request-header">
          <h1 className="request-title">Request Blood</h1>
          <p className="request-subtitle">Submit a blood request for a patient in need</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="request-form">
          <div className="form-group">
            <label htmlFor="patientName">Patient Name</label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              required
              placeholder="Enter patient name"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="bloodGroup">Blood Group Required</label>
              <select
                id="bloodGroup"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                required
              >
                <option value="">Select Blood Group</option>
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

            <div className="form-group">
              <label htmlFor="units">Units Required</label>
              <input
                type="number"
                id="units"
                name="units"
                value={formData.units}
                onChange={handleChange}
                required
                min="1"
                placeholder="Number of units"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="hospitalName">Hospital Name</label>
            <input
              type="text"
              id="hospitalName"
              name="hospitalName"
              value={formData.hospitalName}
              onChange={handleChange}
              required
              placeholder="Enter hospital name"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="contactPerson">Contact Person</label>
              <input
                type="text"
                id="contactPerson"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                required
                placeholder="Contact person name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Contact phone number"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="requiredDate">Required Date</label>
            <input
              type="date"
              id="requiredDate"
              name="requiredDate"
              value={formData.requiredDate}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>

        <div className="request-info">
          <h3>Important Information</h3>
          <ul>
            <li>Please provide accurate patient and hospital information</li>
            <li>Ensure the contact person is available at all times</li>
            <li>Blood requests are visible to registered donors in your area</li>
            <li>Emergency requests will be prioritized</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RequestBlood;
