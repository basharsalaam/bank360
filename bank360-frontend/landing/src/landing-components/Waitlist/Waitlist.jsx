import { useState } from 'react';
import { WaitlistStyles } from './style';
import hero_2 from "../../assets/images/hero_2.png";


const {
  Container, 
} = WaitlistStyles;

const Waitlist = () => {
  const [email, setEmail] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [error, setError] = useState(null); 
  const [success, setSuccess] = useState(null); 

  const handleEmailChange = (e) => {
    setEmail(e.target.value); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setIsSubmitting(true); 

    try {
      const response = await fetch('https://api.bank360.ng/api/waitlist/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), 
      });

      if (!response.ok) {
        throw new Error('Failed to submit email'); 
      }

      const data = await response.json(); 
      setSuccess('Thank you for joining the waitlist!'); 
      setEmail(''); 
    } catch (err) {
      setError(err.message); 
    } finally {
      setIsSubmitting(false); 
    }
  };
  return (
    <Container>
      <div className="waitlist-section">
        <div className="waitlist-content">
          <h2>Join Our Waitlist</h2>
          <p>Receive exclusive updates, early access to features, 
          and special offers tailored just for you.</p>
          <form className="waitlist-form" onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Email address" 
              value={email} 
              onChange={handleEmailChange} 
              required 
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Joining...' : 'Join'}
            </button>
          </form>
          {error && <p className="error-message">{error}</p>} 
          {success && <p className="success-message">{success}</p>} 
        </div>
        <div className="waitlist-image">
          <img src={hero_2} alt="Waitlist Illustration" />
        </div>
      </div>
    </Container>
  );
};

export default Waitlist;
