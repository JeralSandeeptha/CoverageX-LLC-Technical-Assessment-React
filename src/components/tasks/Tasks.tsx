  import { Alert, Backdrop, Button, CircularProgress, Tooltip } from '@mui/material';
  import './Tasks.scss';
  import { TasksComponentProps } from '../../types/component.types';
  import Task from '../task/Task';
  import AddForm from '../add-form/AddForm';
  import { useState } from 'react';
  import useLocalStorage from '../../hooks/useLocalStorage';
  import { useNavigate } from 'react-router-dom';
  import CheckIcon from '@mui/icons-material/Check';
  import updateTask from '../../services/todo-service/update-task/updateTask';
import useAuthContext from '../../hooks/useAuthContext';

  const Tasks = (props: TasksComponentProps) => {

    const navigate = useNavigate();
    const { getLocalStorageItem,clearLocalStorageItem, setLocalStorageItem } = useLocalStorage();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { setToken } = useAuthContext();
    
    const handleUpdateTask = (id: string) => {
      const isConfirmed = window.confirm('Are you sure want to complete this task?');
      if(isConfirmed) {
        updateTask({
          setIsError: setIsError,
          setIsLoading: setIsLoading,
          setIsSuccess: setIsSuccess,
          navigate: navigate,
          token: getLocalStorageItem('accessToken'),
          todoId: id,
          clearLocalStorageItem: clearLocalStorageItem,
          getLocalStorageItem: getLocalStorageItem,
          setLocalStorageItem: setLocalStorageItem,
          setToken: setToken
        });
      }
    }
    
    // console.log("Pedning Tasks" + props.filterTasks);

    return (
      <div className='tasks'>
        <div className="task-inner">

          <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>

          {
            isError && (
              <Alert className='alert-message' icon={<CheckIcon fontSize="inherit" />} severity="error">
                Please try again later
              </Alert>
            )
          }
                  
          {
            isSuccess && (
              <Alert className='alert-message' icon={<CheckIcon fontSize="inherit" />} severity="success">
                Task Completed
              </Alert>
            )
          }

          {
            props.isFormOpen && <AddForm handleVisibleForm={props.handleVisibleForm}/>
          }

          <div className="task-header-content">
            <div className='task-left'>
              <h1>Task Management</h1>
            </div>
            <div className='task-right'>
              <Tooltip title="Add New Task" data-testid='tooltip-add-btn-two'>
                <Button onClick={props.handleVisibleForm} data-testid='add-new-btn' type="submit" variant="contained" size="small" className='control-button'>+ Add Task</Button>
              </Tooltip>
            </div>
          </div>

          <div className="tasks-show-container">
            {
              props.filterTasks.length === 0 ? (
                <h4 className='no-content-text'>Hooray! Currently you don't have any tasks.</h4>
              ) : (
                <div className="tasks-mapping">
                  {
                    props.filterTasks.map((task) => {
                      return (
                        <Task>
                          <div className='single-task'>
                            <div className="task-content">
                              <Task.Title>{ task.title }</Task.Title>
                              <Task.Description>{ task.description }</Task.Description>
                            </div>
                            <div className="button-container">
                              <Task.Button handleUpdateTask={() => handleUpdateTask(task?.id ?? '')}>Done</Task.Button>
                            </div>
                          </div>
                        </Task>
                      )
                    })
                  }
                </div>
              )
            }
          </div>

        </div>
      </div>
    );

  }

  export default Tasks;