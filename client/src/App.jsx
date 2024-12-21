import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const App = () => {
    const [task, setTask] = useState({ title: '', description: '' });
    const [tasks, setTasks] = useState([]);

    const baseUrl = 'http://localhost:3001'; // URL de votre backend

    // Charger les tâches depuis le backend
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

    const handleAddTask = async () => {
        if (task.title) {
            try {
                await Axios.post(`${baseUrl}/tasks`, task);
                setTask({ title: '', description: '' });
                fetchTasks();
            } catch (error) {
                console.error('Erreur lors de l’ajout de la tâche :', error);
            }
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await Axios.delete(`${baseUrl}/tasks/${id}`);
            fetchTasks();
        } catch (error) {
            console.error('Erreur lors de la suppression de la tâche :', error);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>To-Do List</h1>

            {/* Formulaire pour ajouter une tâche */}
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    name="title"
                    placeholder="Titre"
                    value={task.title}
                    onChange={(e) => setTask({ ...task, title: e.target.value })}
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={task.description}
                    onChange={(e) => setTask({ ...task, description: e.target.value })}
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <button onClick={handleAddTask} style={{ padding: '5px 10px' }}>
                    Ajouter
                </button>
            </div>

            {/* Liste des tâches */}
            <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                {tasks.map((t) => (
                    <li key={t.id} style={{ marginBottom: '10px' }}>
                        <strong>{t.title}</strong>: {t.description}
                        <button
                            onClick={() => handleDeleteTask(t.id)}
                            style={{ marginLeft: '10px', padding: '3px 6px' }}
                        >
                            Supprimer
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
