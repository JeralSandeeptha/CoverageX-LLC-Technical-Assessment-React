import { useState } from 'react';
import Tasks from '../tasks/Tasks';
import './TaskContent.scss';
import { ITask } from '../../types/interfaces.types';
import useRandomColor from '../../hooks/useRandomColor';

const TaskContent = () => {

    const [tasks, setTasks] = useState<ITask[]>([
        { id: "1", title: "Task 1", description: "Complete project setup Complete project setup Complete project setup Complete project setup", userId: "101", crated_at: "2024-07-18T10:00:00Z" },
        { id: "2", title: "Task 2", description: "Design database schema", userId: "102", crated_at: "2024-07-18T11:00:00Z" },
        { id: "3", title: "Task 3", description: "Implement authentication", userId: "103", crated_at: "2024-07-18T12:00:00Z" },
        { id: "4", title: "Task 4", description: "Create REST API endpoints", userId: "104", crated_at: "2024-07-18T13:00:00Z" },
        { id: "5", title: "Task 5", description: "Develop frontend components", userId: "105", crated_at: "2024-07-18T14:00:00Z" },
        { id: "6", title: "Task 6", description: "Test application", userId: "106", crated_at: "2024-07-18T15:00:00Z" },
        { id: "7", title: "Task 7", description: "Fix bugs and optimize code", userId: "107", crated_at: "2024-07-18T16:00:00Z" },
        { id: "8", title: "Task 8", description: "Write documentation", userId: "108", crated_at: "2024-07-18T17:00:00Z" },
        { id: "9", title: "Task 9", description: "Deploy application", userId: "109", crated_at: "2024-07-18T18:00:00Z" },
        { id: "10", title: "Task 10", description: "Monitor performance", userId: "110", crated_at: "2024-07-18T19:00:00Z" }
    ]);

    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

    const { randomColor, getRandomColor } = useRandomColor(); 

    const handleVisibleForm = () => {
        setIsFormOpen(!isFormOpen);
    }

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