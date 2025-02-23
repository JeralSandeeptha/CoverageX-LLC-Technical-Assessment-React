import './Navbar.scss';
import logo from '../../assets/icons/pfizer.png';
import { Tooltip } from '@mui/material';
import logout from '../../assets/icons/exit.png';

const Navbar = () => {

    const logOutUser = () => {

    }

    return (
        <div className='navbar' data-testid="navbar">
            <div className="navbar-inner">
                <div className="logo-content">
                    <img src={logo} alt="logo" className="logo" data-testid='logo'/>
                </div>
                <div className='auth-btns'>
                    <Tooltip title="Logout" data-testid='tooltip-logout'>
                        <div className="icon-container" onClick={logOutUser}>
                            <img src={logout} alt="logout-icon" className="icon" data-testid='logout'/>
                        </div>
                    </Tooltip>
                </div>
            </div>
        </div>
    );

}

export default Navbar;