import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './DonateBlood.css';

function DonateBlood() {
  const [formData, setFormData] = useState({
    name: '',
    DOB: '',
    bloodGroup: '',
    phone: '',
    email: '',
    password: '',
    city: '',
    state: '',
    country: '',
    lastDonateDate: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [canDonate, setCanDonate] = useState(true);
  const [lastDonateInfo, setLastDonateInfo] = useState('');
  const [profileLoading, setProfileLoading] = useState(true);
  const navigate = useNavigate();
  const { userEmail } = useAuth();

  useEffect(() => {
    if (userEmail) {
      fetchUserProfile();
    }
  }, [userEmail]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/profile/${userEmail}`);
      if (response.ok) {
        const profile = await response.json();
        
        // Pre-fill form with user data
        setFormData({
          name: profile.name || '',
          DOB: profile.DOB ? profile.DOB.split('T')[0] : '',
          bloodGroup: profile.bloodGroup || '',
          phone: profile.phone || '',
          email: profile.email || userEmail,
          password: '',
          city: profile.city || '',
          state: profile.state || '',
          country: profile.country || '',
          lastDonateDate: profile.lastDonateDate ? profile.lastDonateDate.split('T')[0] : ''
        });

        // Check if user can donate (3 months since last donation)
        if (profile.lastDonateDate) {
          const lastDate = new Date(profile.lastDonateDate);
          const today = new Date();
          const monthsDiff = (today.getFullYear() - lastDate.getFullYear()) * 12 + 
                           (today.getMonth() - lastDate.getMonth());
          
          if (monthsDiff < 3) {
            setCanDonate(false);
            const monthsRemaining = 3 - monthsDiff;
            setLastDonateInfo(`You last donated on ${lastDate.toLocaleDateString()}. You can donate again in ${monthsRemaining} month(s).`);
          }
        }
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!canDonate) {
      setError('You cannot donate yet. Please wait until the required time has passed.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/donars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate('/donors');
      } else {
        const data = await response.text();
        setError(data || 'Registration failed');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="donate-container">
      <div className="donate-card">
        <div className="donate-header">
          <h1 className="donate-title">Donate Blood</h1>
          <p className="donate-subtitle">Register as a blood donor and save lives</p>
        </div>

        {profileLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading your profile...</p>
          </div>
        ) : !canDonate ? (
          <div className="cannot-donate">
            <div className="cannot-donate-icon">⏳</div>
            <h2>Cannot Donate Yet</h2>
            <p>{lastDonateInfo}</p>
            <p className="info-text">For your health and safety, you must wait at least 3 months between blood donations.</p>
          </div>
        ) : (
          <>
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="donate-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="DOB">Date of Birth</label>
              <input
                type="date"
                id="DOB"
                name="DOB"
                value={formData.DOB}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="bloodGroup">Blood Group</label>
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
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter your phone"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a password"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="Enter your city"
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                placeholder="Enter your state"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                placeholder="Enter your country"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastDonateDate">Last Donation Date (Optional)</label>
              <input
                type="date"
                id="lastDonateDate"
                name="lastDonateDate"
                value={formData.lastDonateDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Registering...' : 'Register as Donor'}
          </button>
        </form>

        <div className="donate-info">
          <h3>Why Donate Blood?</h3>
          <ul>
            <li>Save up to 3 lives with one donation</li>
            <li>Regular donation improves cardiovascular health</li>
            <li>Free health screening with each donation</li>
            <li>Help patients in emergency situations</li>
          </ul>
        </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DonateBlood;
