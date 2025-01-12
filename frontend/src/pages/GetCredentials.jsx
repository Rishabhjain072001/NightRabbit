import React from 'react';
import '../styles/GetCredentials.css';

const GetCredentialsPage = () => {
  return (
    <div className="get-credentials-container">
      <div className="content-wrapper">
      <div class="logo-container">
        <img src="/logo-light.jpeg" alt="Website Logo" class="logo" />
      </div>

        <h1>Get Your Login Credentials</h1>
        <p className="subheading">
          Follow these simple steps to access exclusive 18+ content, including over 90 lakh videos and 40,000+ categories!
        </p>

        <div className="steps">
          <div className="step">
            <h3>Step 1: Make a Payment</h3>
            <p>Scan the QR code below to complete your payment and gain access to our premium content!</p>
            <img src="/images/qrcode.jpeg" width={200} alt="Pay with QR Code" />
          </div>
          
          <div className="step">
            <h3>Step 2: Share the Screenshot</h3>
            <p>Once you’ve completed the payment, take a screenshot and send it to us on <a href="https://t.me/YourTelegramUsername" target="_blank" rel="noopener noreferrer">Telegram</a> for verification.</p>
          </div>

          <div className="step">
            <h3>Step 3: Receive Your Credentials</h3>
            <p>After verification, you’ll receive your login credentials and gain full access to our platform.</p>
          </div>
        </div>

        <div className="marketing-content">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>Access to over 90 lakh exclusive 18+ videos!</li>
            <li>Explore a massive selection of more than 40,000 categories!</li>
            <li>No annoying ads, just pure content!</li>
            <li>Stay updated with fresh content added regularly!</li>
          </ul>
        </div>

        <div className="cta">
          <h3>Ready to get started?</h3>
          <p>Don’t miss out on this incredible offer! Unlock a world of exclusive content now.</p>
        </div>
      </div>
    </div>
  );
};

export default GetCredentialsPage;
