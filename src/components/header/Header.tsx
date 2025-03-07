import { useEffect, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import './Header.scss';
import { ITask, IUser } from '../../types/interfaces.types';
import getTasksByUserId from '../../services/todo-service/getTasksByUserId/getTasksByUserId';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext';

const Header = () => {

  const { setToken } = useAuthContext();
  const navigate = useNavigate();
  const { getLocalStorageItem, clearLocalStorageItem, setLocalStorageItem } = useLocalStorage();
  const [user, setUser] = useState<IUser>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tasks, setTasks] = useState<ITask[]>([]);

  const filterCompletedTasks = () => {
    const completedTasks = tasks.filter((task) => {
      return task.iscompleted === true;
    });
    return completedTasks.length;
  }
  const filterPendingTasks = () => {
    const pendingTasks = tasks.filter((task) => {
      return task.iscompleted === false;
    });
    return pendingTasks.length;
  }

  useEffect(() => {
    const user = getLocalStorageItem('user');
    setUser(user);
    getTasksByUserId({
      userId: getLocalStorageItem('user').id,
      setTasks: setTasks,
      token: getLocalStorageItem('accessToken'),
      clearLocalStorageItem: clearLocalStorageItem,
      getLocalStorageItem: getLocalStorageItem,
      navigate: navigate,
      setToken: setToken,
      setLocalStorageItem: setLocalStorageItem
    });
    // filterCompletedTasks();
  }, []);

  return (
    <div className='header-section' data-test-id='header'>
      <div className="header-inner">
        <div className="header-left">
            <div className="upper">
              <h1 className='left-header'>Welcome { user?.email.split('@')[0] }</h1>
              <h4 className='left-subheader'>Welcome to your Task Dashboard</h4>
            </div>
            <div className="lower">
              <h5>{ user?.email }</h5>
              <h5>Date of joined: { user?.created_at?.split('T')[0] }</h5>
            </div>
        </div>
        <div className="header-right">
            <div className="pending container">
                <h3 className='task-header'>Pending Tasks</h3>
                <div className='task-container'>
                    <h1 className='active'>{ filterPendingTasks() }</h1>
                    <h1 className='slash'>/</h1>
                    <h1 className='all'>{tasks.length}</h1>
                </div>
            </div>
            <div className="completed container">
                <h3 className='task-header'>Completed Tasks</h3>
                <div className='task-container'>
                    <h1 className='active'>{ filterCompletedTasks() }</h1>
                    <h1 className='slash'>/</h1>
                    <h1 className='all'>{tasks.length}</h1>
                </div>
            </div>
        </div>
      </div>
    </div>
  );

}

export default Header;
