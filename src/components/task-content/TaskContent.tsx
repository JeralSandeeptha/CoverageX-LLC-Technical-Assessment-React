import { useEffect, useState } from 'react';
import Tasks from '../tasks/Tasks';
import './TaskContent.scss';
import { ITask } from '../../types/interfaces.types';
import useRandomColor from '../../hooks/useRandomColor';
import getTasksByUserId from '../../services/todo-service/getTasksByUserId/getTasksByUserId';
import useLocalStorage from '../../hooks/useLocalStorage';

const TaskContent = () => {

    const [tasks, setTasks] = useState<ITask[]>([]);
    const [filterTasks, setFilterTasks] = useState<ITask[]>([]);
    const { getLocalStorageItem } = useLocalStorage(); 
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const { randomColor, getRandomColor } = useRandomColor(); 

    const handleVisibleForm = () => {
        setIsFormOpen(!isFormOpen);
    }

    const filterPendingTasks = () => {
        const pendingTasks = tasks.filter((task) => {
          return task.iscompleted === false;
        });
        const recentTasks = pendingTasks.slice(-5).reverse();
        setFilterTasks(recentTasks);
    }

    const getAllTasks = () => {
        getTasksByUserId({
            userId: getLocalStorageItem('user').id,
            setTasks: setTasks,
            token: getLocalStorageItem('accessToken')
        });
    }

    useEffect(() => {
        getAllTasks();
    }, []);
    
    useEffect(() => {
        filterPendingTasks();
    }, [tasks]);

    return (
        <Tasks 
            tasks={tasks} 
            filterTasks={filterTasks}
            setTasks={setTasks}
            isFormOpen={isFormOpen}
            setIsFormOpen={setIsFormOpen}
            handleVisibleForm={handleVisibleForm}
            randomColor={randomColor}
            getRandomColor={getRandomColor}
        />
    );

}

export default TaskContent;