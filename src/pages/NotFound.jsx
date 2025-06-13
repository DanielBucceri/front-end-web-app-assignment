import { Link } from 'react-router-dom';

const NotFound = () => (
  <div style={{ textAlign: 'center', padding: '2rem' }}>
    <h1>404 – Page Not Found</h1>
    <p>The page you’re looking for doesn’t exist.</p>
    <Link to="/dashboard">Return To Dashboard</Link>
  </div>
);

export default NotFound;
