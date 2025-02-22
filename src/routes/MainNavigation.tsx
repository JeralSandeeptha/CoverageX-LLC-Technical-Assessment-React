import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFoundPage from '../pages/notfound-page/NotFoundPage';
import RegisterPage from '../pages/register-page/RegisterPage';
import LoginPage from '../pages/login-page/LoginPage';
import DashboardPage from '../pages/dashboard-page/DashboardPage';

const MainNavigation = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={LoginPage}/>
        <Route path='/register' Component={RegisterPage}/>
        <Route path='/dashboard' Component={DashboardPage}/>
        <Route path='*' Component={NotFoundPage}/>
      </Routes>
    </BrowserRouter>
  )
}

export default MainNavigation;