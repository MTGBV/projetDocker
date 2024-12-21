import React, { useState } from 'react';
import Axios from 'axios';

const AddTaskPage = () => {
    const [task, setTask] = useState({ title: '', description: '', importance: 'medium', difficulty: 'medium', deadline: '' });

    const baseUrl = 'http://localhost:3001'; // URL de votre backend

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
        <div>
            <h2>Ajouter une tâche</h2>
            <input
                type="text"
                placeholder="Titre"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
            />
            <button onClick={handleAddTask}>Ajouter</button>
        </div>
    );
};

export default AddTaskPage;
