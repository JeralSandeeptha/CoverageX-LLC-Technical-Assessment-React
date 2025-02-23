import './Header.scss';

const Header = () => {

  return (
    <div className='header-section'>
      <div className="header-inner">
        <div className="header-left">
            <h1 className='left-header'>Welcome Jeral</h1>
            <h4 className='left-subheader'>Welcome to your Task Dashboard</h4>
        </div>
        <div className="header-right">
            <div className="pending container">
                <h3 className='task-header'>Pending Tasks</h3>
                <div className='task-container'>
                    <h1 className='active'>15</h1>
                    <h1 className='slash'>/</h1>
                    <h1 className='all'>25</h1>
                </div>
            </div>
            <div className="completed container">
                <h3 className='task-header'>Completed Tasks</h3>
                <div className='task-container'>
                    <h1 className='active'>10</h1>
                    <h1 className='slash'>/</h1>
                    <h1 className='all'>25</h1>
                </div>
            </div>
        </div>
      </div>
    </div>
  );

}

export default Header;
