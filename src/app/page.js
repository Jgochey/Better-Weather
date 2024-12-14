'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.

import { useAuth } from '@/utils/context/authContext';
import ForecastCard from '../components/ForecastCard';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '50px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <ForecastCard UserId={user.uid} />
    </div>
  );
}

export default Home;
