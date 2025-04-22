import React from 'react';

const Home = () => {
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{
          fontSize: '2.25rem',
          fontWeight: 'bold',
          color: '#1f2937', 
          
          marginBottom: '0.5rem',
        }}>
          Social Media Analytics
        </h1>
        <p style={{
          marginTop: '1rem',
          fontSize: '1.25rem',
          color: '#6b7280' 
        }}>
          Gain insights and make data-driven decisions with our powerful analytics tools.
        </p>
      </div>

      <div style={{ marginTop: '5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem',
          sm: { gridTemplateColumns: '1fr 1fr' },
          lg: { gridTemplateColumns: '1fr 1fr 1fr' },
        }}>
          {[{
            title: "Real-Time Metrics",
            text: "Track follower growth, engagement rates, and post performance in real time.",
          }, {
            title: "Audience Insights",
            text: "Understand your audience demographics, behavior, and preferences to tailor your strategy.",
          }, {
            title: "Performance Reports",
            text: "Generate detailed reports with charts and key KPIs for data-driven decisions.",
          }].map((item, index) => (
            <div key={index} style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
              transition: 'box-shadow 0.2s',
              cursor: 'pointer',
            }}
              onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'}
              onMouseOut={e => e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)'}
            >
              <h3 style={{ fontSize: '1.125rem', fontWeight: 500, color: '#1f2937' }}>
                {item.title}
              </h3>
              <p style={{ marginTop: '0.5rem', color: '#6b7280' }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;