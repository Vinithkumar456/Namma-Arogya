import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashBoard.css';

const HealthDashboard = () => {
  const [activeFeature, setActiveFeature] = useState(null);
  const navigate = useNavigate();

  const styles = {
    container: { fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px' },
    navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' },
    logo: { display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: '20px', color: '#2c3e50' },
    navLinks: { display: 'flex', gap: '20px', color: '#2c3e50' },
    registerButton: { backgroundColor: '#4ac4d6', color: 'white', padding: '10px 20px', borderRadius: '20px', border: 'none', cursor: 'pointer' },
    heroSection: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f4f9fc', borderRadius: '15px', padding: '40px', marginBottom: '40px' },
    heroContent: { flex: '1', paddingRight: '40px' },
    heroTitle: { fontSize: '2.5rem', color: '#2c3e50', marginBottom: '20px' },
    heroHighlight: { color: '#4ac4d6' },
    heroDescription: { color: '#6c757d', marginBottom: '20px' },
    consultButton: { backgroundColor: '#4ac4d6', color: 'white', padding: '12px 24px', borderRadius: '25px', border: 'none', cursor: 'pointer', fontSize: '16px' },
    statsContainer: { display: 'flex', justifyContent: 'space-between', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
    statItem: { textAlign: 'center', color: '#2c3e50' },
    statNumber: { fontSize: '24px', fontWeight: 'bold', color: '#4ac4d6' },
    servicesGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '40px' },
    serviceCard: { backgroundColor: '#f4f9fc', borderRadius: '10px', padding: '20px', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.3s ease' },
    serviceIcon: { fontSize: '48px', marginBottom: '15px', color: '#4ac4d6' }
  };

  const services = [
    { id: 'symptomChecker', name: 'Symptom-Disease Checker', description: 'Check potential health conditions', icon: '🩺' },
    { id: 'consultDoctor', name: 'Consult a Doctor', description: 'Professional medical consultation', icon: '👩‍⚕️' },
    { id: 'chatDoctor', name: 'Chat with Doctor', description: 'Instant medical advice', icon: '💬' },
    { id: 'aiChatbot', name: 'AI Health Chatbot', description: 'Preliminary health guidance', icon: '🤖' },
    { id: 'voiceSymptomChecker', name: 'Voice Symptom Checker', description: 'Check symptoms by voice', icon: '🎙️' }
  ];

  const handleServiceClick = (serviceId) => {
    setActiveFeature(serviceId);

    if (serviceId === 'chatDoctor') {
      navigate('/chat');
    } else if (serviceId === 'symptomChecker') {
      navigate('/symptoms');
    }
    else if (serviceId === 'voiceSymptomChecker') {
      navigate('/voicesymptoms');
    }
  };

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <div style={styles.logo}>HaiDoc</div>
        <div style={styles.navLinks}>
          <span>Home</span>
          <span>Services</span>
          <span>Product</span>
          <span>About Us</span>
        </div>
        <button style={styles.registerButton}>Register</button>
      </nav>

      <div style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            We Are Ready to <span style={styles.heroHighlight}>Help Your Health</span> Problems
          </h1>
          <p style={styles.heroDescription}>
            Your health is very important, especially since the number of health issues is increasing day by day, so we are ready to help you with your health consultation.
          </p>
          <button style={styles.consultButton}>Try Free Consultation</button>
        </div>
        <div>
          <div style={{ width: '300px', height: '300px', backgroundColor: '#4ac4d6', borderRadius: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
            Medical Team Image
          </div>
        </div>
      </div>

      <div style={styles.statsContainer}>
        <div style={styles.statItem}>
          <div style={styles.statNumber}>200+</div>
          <div>Active Doctor</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statNumber}>15K+</div>
          <div>Active User</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statNumber}>50+</div>
          <div>Active Pharmacy</div>
        </div>
      </div>

      <div style={styles.servicesGrid}>
        {services.map((service) => (
          <div
            key={service.id}
            style={{ ...styles.serviceCard, transform: activeFeature === service.id ? 'scale(1.05)' : 'scale(1)' }}
            onClick={() => handleServiceClick(service.id)}
          >
            <div style={styles.serviceIcon}>{service.icon}</div>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthDashboard;
