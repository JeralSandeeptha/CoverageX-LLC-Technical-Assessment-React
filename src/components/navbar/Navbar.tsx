import './Navbar.scss';
import logo from '../../assets/icons/pfizer.png';
import { Tooltip } from '@mui/material';
import logout from '../../assets/icons/exit.png';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext';
import logoutUser from '../../services/user-service/logoutUser/logoutUser';

const Navbar = () => {

    const { clearLocalStorageItem } = useLocalStorage();
    const { setToken } = useAuthContext();
    const navigate = useNavigate();

    const logOutUser = () => {
        const isConfirmed = window.confirm('Are you sure want to logout?');
        if(isConfirmed) {
            logoutUser();
            clearLocalStorageItem('user');
            clearLocalStorageItem('accessToken');
            setToken(null);
            navigate('/');
        }
    }

    return (
        <div className='navbar' data-testid="navbar">
            <div className="navbar-inner">
                <div className="logo-content">
                    <img src={logo} alt="logo" className="logo" data-testid='logo'/>
                </div>
                <div className='auth-btns'>
                    <Tooltip title="Logout" data-testid='tooltip-logout'>
                        <div className="icon-container" onClick={logOutUser} data-testid='logout-btn'>
                            <img src={logout} alt="logout-icon" className="icon" data-testid='logout-image'/>
                        </div>
                    </Tooltip>
                </div>
            </div>
        </div>
    );

}

export default Navbar;