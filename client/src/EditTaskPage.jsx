import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const EditTaskPage = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const baseUrl = 'http://localhost:3001';

    const fetchTasks = async () => {
        try {
            const response = await Axios.get(`${baseUrl}/tasks`);
            setTasks(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des tâches :', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleUpdateTask = async () => {
        if (selectedTask) {
            try {
                await Axios.put(`${baseUrl}/tasks/${selectedTask.id}`, selectedTask);
                alert('Tâche mise à jour avec succès !');
            } catch (error) {
                console.error('Erreur lors de la mise à jour de la tâche :', error);
            }
        }
    };

    return (
        <div className="form-container">
            <h2>Modifier une tâche</h2>
            <select
                onChange={(e) => {
                    const task = tasks.find((t) => t.id === parseInt(e.target.value));
                    setSelectedTask(task || null);
                }}
            >
                <option value="">Sélectionner une tâche</option>
                {tasks.map((t) => (
                    <option key={t.id} value={t.id}>
                        {t.title}
                    </option>
                ))}
            </select>
            {selectedTask && (
                <>
                    <input
                        type="text"
                        value={selectedTask.title}
                        onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
                    />
                    <textarea
                        value={selectedTask.description}
                        onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
                    />
                    <select
                        value={selectedTask.importance}
                        onChange={(e) => setSelectedTask({ ...selectedTask, importance: e.target.value })}
                    >
                        <option value="low">Faible</option>
                        <option value="medium">Moyenne</option>
                        <option value="high">Haute</option>
                    </select>
                    <select
                        value={selectedTask.difficulty}
                        onChange={(e) => setSelectedTask({ ...selectedTask, difficulty: e.target.value })}
                    >
                        <option value="easy">Facile</option>
                        <option value="medium">Moyenne</option>
                        <option value="hard">Difficile</option>
                    </select>
                    <input
                        type="date"
                        value={selectedTask.deadline}
                        onChange={(e) => setSelectedTask({ ...selectedTask, deadline: e.target.value })}
                    />
                    <button onClick={handleUpdateTask}>Enregistrer</button>
                </>
            )}
        </div>
    );
};

export default EditTaskPage;
