import React, { useState } from 'react';
import Axios from 'axios';

const AddTaskPage = () => {
    const [task, setTask] = useState({ title: '', description: '', importance: 'medium', difficulty: 'medium', deadline: '' });
    const baseUrl = 'http://localhost:3001';

    const handleAddTask = async () => {
        if (task.title) {
            try {
                await Axios.post(`${baseUrl}/tasks`, task);
                alert('Tâche ajoutée avec succès !');
                setTask({ title: '', description: '', importance: 'medium', difficulty: 'medium', deadline: '' });
            } catch (error) {
                console.error('Erreur lors de l’ajout de la tâche :', error);
            }
        } else {
            alert('Veuillez remplir le titre de la tâche.');
        }
    };

    return (
        <div className="form-container">
            <h2>Ajouter une tâche</h2>
            <input
                type="text"
                placeholder="Titre"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
            />
            <textarea
                placeholder="Description"
                value={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
            />
            <select
                value={task.importance}
                onChange={(e) => setTask({ ...task, importance: e.target.value })}
            >
                <option value="low">Faible</option>
                <option value="medium">Moyenne</option>
                <option value="high">Haute</option>
            </select>
            <select
                value={task.difficulty}
                onChange={(e) => setTask({ ...task, difficulty: e.target.value })}
            >
                <option value="easy">Facile</option>
                <option value="medium">Moyenne</option>
                <option value="hard">Difficile</option>
            </select>
            <input
                type="date"
                value={task.deadline}
                onChange={(e) => setTask({ ...task, deadline: e.target.value })}
            />
            <button onClick={handleAddTask}>Ajouter</button>
        </div>
    );
};

export default AddTaskPage;
