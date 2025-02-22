import './App.css';
import AuthProvider from './context/authContext';
import MainNavigation from './routes/MainNavigation';

function App() {

  return (
    <AuthProvider>
      <MainNavigation />
    </AuthProvider>
  )
}

export default App;