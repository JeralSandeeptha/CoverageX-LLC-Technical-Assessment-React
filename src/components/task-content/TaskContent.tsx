import { useEffect, useState } from 'react';
import Tasks from '../tasks/Tasks';
import './TaskContent.scss';
import { ITask } from '../../types/interfaces.types';
import useRandomColor from '../../hooks/useRandomColor';
import getTasksByUserId from '../../services/todo-service/getTasksByUserId/getTasksByUserId';
import useLocalStorage from '../../hooks/useLocalStorage';

const TaskContent = () => {

    const [tasks, setTasks] = useState<ITask[]>([]);
    const { getLocalStorageItem } = useLocalStorage(); 
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const { randomColor, getRandomColor } = useRandomColor(); 

    const handleVisibleForm = () => {
        setIsFormOpen(!isFormOpen);
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

    return (
        <Tasks 
            tasks={tasks} 
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