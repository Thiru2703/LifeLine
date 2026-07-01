function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to LifeLine</h1>
        <p className="hero-subtitle">Your blood donation platform connecting donors with those in need</p>
        <div className="hero-buttons">
          <button className="cta-button primary">Donate Now</button>
          <button className="cta-button secondary">Find Donors</button>
        </div>
      </div>

      <div className="features-section">
        <h2 className="section-title">How It Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-number">1</div>
            <h3 className="feature-title">Register</h3>
            <p className="feature-description">Create your profile as a donor or request blood</p>
          </div>
          <div className="feature-card">
            <div className="feature-number">2</div>
            <h3 className="feature-title">Connect</h3>
            <p className="feature-description">Find matching donors or blood requests in your area</p>
          </div>
          <div className="feature-card">
            <div className="feature-number">3</div>
            <h3 className="feature-title">Save Lives</h3>
            <p className="feature-description">Donate blood or receive the help you need</p>
          </div>
        </div>
      </div>

      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">LifeLine</h3>
            <p className="footer-text">Connecting donors with those in need. Every drop counts.</p>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/donors">Find Donors</a></li>
              <li><a href="/requests">Blood Requests</a></li>
              <li><a href="/dashboard">Dashboard</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <p className="footer-text">Email: thirunavukkarasu2703@gmail.com</p>
            <p className="footer-text">Phone: +91 95433 21652</p>
          </div>
        </div>
        <div className="footer-bottom">
            <p>Developed by Thirunavukkarasu R</p>
          <p>&copy;LifeLine. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;