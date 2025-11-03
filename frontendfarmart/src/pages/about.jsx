import React from "react";
import Footer from "../components/common/footer";
import "./about.css";

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <h1>About Farmart</h1>
        <p>
          <strong>Farmart</strong> is a digital platform connecting farmers and
          buyers directly. We help eliminate middlemen, ensuring farmers earn
          fair prices and buyers access high-quality livestock at affordable
          rates.
        </p>

        <div className="about-highlights">
          <div className="highlight-card">
            <h3>🌾 Empowering Farmers</h3>
            <p>
              We give farmers the visibility and tools to sell their livestock
              directly to trusted buyers.
            </p>
          </div>

          <div className="highlight-card">
            <h3>💡 Smart Buying</h3>
            <p>
              Browse animals by type, breed, and age — all with transparent
              pricing and reviews.
            </p>
          </div>

          <div className="highlight-card">
            <h3>📦 Seamless Experience</h3>
            <p>
              Enjoy a simple, intuitive, and reliable online livestock trading
              experience.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
