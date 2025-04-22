import React from 'react';

const About = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About Us</h1>

      <div className="prose prose-lg text-gray-500">
        <p className="mb-4">
          We are a team of data-driven enthusiasts focused on transforming social media insights into powerful business strategies. With years of experience in analytics, marketing, and development, we help brands make smarter decisions through data.
        </p>

        <p className="mb-4">
          Our platform provides detailed analytics across major social media networks including Instagram, Twitter, Facebook, LinkedIn, and TikTok. From follower growth to engagement rates and content performance, we give you the tools to understand what truly resonates with your audience.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
        <p className="mb-4">
          To empower creators, marketers, and businesses with actionable insights from social media data — helping them grow their online presence and connect meaningfully with their communities.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Choose Us</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Real-time analytics and data visualization</li>
          <li>AI-powered content performance predictions</li>
          <li>Customizable dashboards and reports</li>
          <li>Cross-platform tracking from one place</li>
          <li>Privacy-first and GDPR compliant</li>
        </ul>

        <p className="mb-4">
          Whether you're a brand, influencer, or digital agency — we make analytics simple, powerful, and easy to act on.
        </p>
      </div>
    </div>
  );
};

export default About;

