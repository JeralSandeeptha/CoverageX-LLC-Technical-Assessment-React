import './App.css';
import AuthProvider from './context/authContext';
import MainNavigation from './routes/MainNavigation';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {

  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <MainNavigation />
      </GoogleOAuthProvider>
    </AuthProvider>
  )
}

export default App;