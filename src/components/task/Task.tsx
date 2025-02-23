import { Button } from '@mui/material';
import { TaskComponentProps } from '../../types/component.types';
import './Task.scss';

const Task = (props: TaskComponentProps) => {

  return (
    <>
      { props.children }
    </>
  );

}

export default Task;

export const TaskTitle = (props: TaskComponentProps) => {
  return (
    <h2 className="task-title">{ props.children }</h2>
  );
}
export const TaskDescription = (props: TaskComponentProps) => {
  return (
    <h5 className="task-description">{ props.children }</h5>
  );
}
export const TaskButton = (props: TaskComponentProps) => {
  return (
    <Button data-testid='task-button' type="submit" variant="contained" size="small" className='control-button'>{ props.children }</Button>
  );
}
export const TaskUser = (props: TaskComponentProps) => {
  return (
    <h5 className='task-user'>{ props.children }</h5>
  );
}
export const TaskCreatedAt = (props: TaskComponentProps) => {
  return (
    <h5 className='task-date'>{ props.children }</h5>
  );
}

Task.Title = TaskTitle;
Task.Button = TaskButton;
Task.Description = TaskDescription;
Task.User = TaskUser;
Task.Date = TaskCreatedAt;