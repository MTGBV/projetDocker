import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const DeleteTaskPage = () => {
    const [tasks, setTasks] = useState([]);
    const baseUrl = 'http://localhost:3001';

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await Axios.get(`${baseUrl}/tasks`);
            setTasks(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des tâches :', error);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await Axios.delete(`${baseUrl}/tasks/${id}`);
            fetchTasks();
            alert('Tâche supprimée avec succès !');
        } catch (error) {
            console.error('Erreur lors de la suppression de la tâche :', error);
        }
    };

    return (
        <div>
            <h2>Supprimer une tâche</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.title} <button onClick={() => handleDeleteTask(task.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DeleteTaskPage;
