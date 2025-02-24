import { Button, Tooltip } from '@mui/material';
import './Tasks.scss';
import { TasksComponentProps } from '../../types/component.types';
import Task from '../task/Task';
import AddForm from '../add-form/AddForm';

const Tasks = (props: TasksComponentProps) => {

  console.log(props.randomColor);

  return (
    <div className='tasks'>
      <div className="task-inner">

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
            props.tasks.length === 0 ? (
              <h4 className='no-content-text'>Currently you don't have any tasks.</h4>
            ) : (
              <div className="tasks-mapping">
                {
                  props.tasks.map((task) => {
                    return (
                      <Task>
                        <div className='single-task' style={{ backgroundColor: props.getRandomColor() }}>
                          <div className="task-content">
                            <Task.Title>{ task.title }</Task.Title>
                            <Task.Description>{ task.description }</Task.Description>
                          </div>
                          <div className="button-container">
                            <Task.Button>Done</Task.Button>
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