import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Axios from 'axios';
import AddTaskPage from './AddTaskPage';
import DeleteTaskPage from './DeleteTaskPage';

const App = () => {
    const [task, setTask] = useState({ title: '', description: '', importance: 'medium', difficulty: 'medium', deadline: '' });
    const [tasks, setTasks] = useState([]);
    const [editTask, setEditTask] = useState(null); // Tâche sélectionnée pour modification

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

    const handleUpdateTask = async (id) => {
        try {
            await Axios.put(`${baseUrl}/tasks/${id}`, editTask);
            setEditTask(null); // Réinitialiser l'état après la modification
            fetchTasks(); // Recharger la liste des tâches
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la tâche :', error);
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
        <Router>
            <div style={{ padding: '20px', fontFamily: 'Arial' }}>
                <h1>To-Do List</h1>

                {/* Barre de navigation */}
                <nav>
                    <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                        <li>
                            <Link to="/" style={{ marginRight: '10px' }}>Accueil</Link>
                            <Link to="/add-task" style={{ marginRight: '10px' }}>Ajouter une tâche</Link>
                            <Link to="/delete-task">Supprimer une tâche</Link>
                        </li>
                    </ul>
                </nav>

                {/* Configuration des routes */}
                <Routes>
                    {/* Page principale avec la liste des tâches */}
                    <Route
                        path="/"
                        element={
                            <>
                                {/* Liste des tâches */}
                                <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                                    {tasks.map((t) => (
                                        <li key={t.id} style={{ marginBottom: '10px' }}>
                                            <strong>{t.title}</strong>: {t.description} <br />
                                            Importance: {t.importance}, Difficulté: {t.difficulty}, Deadline: {t.deadline || 'Aucune'} <br />
                                            <button
                                                onClick={() => handleDeleteTask(t.id)}
                                                style={{ marginRight: '10px', padding: '3px 6px' }}
                                            >
                                                Supprimer
                                            </button>
                                            <button
                                                onClick={() => setEditTask(t)}
                                                style={{ padding: '3px 6px' }}
                                            >
                                                Modifier
                                            </button>
                                        </li>
                                    ))}
                                </ul>

                                {/* Formulaire conditionnel pour modifier une tâche */}
                                {editTask && (
                                    <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                                        <h3>Modifier une tâche</h3>
                                        <input
                                            type="text"
                                            name="title"
                                            placeholder="Titre"
                                            value={editTask.title}
                                            onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                                            style={{ marginRight: '10px', padding: '5px' }}
                                        />
                                        <input
                                            type="text"
                                            name="description"
                                            placeholder="Description"
                                            value={editTask.description}
                                            onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                                            style={{ marginRight: '10px', padding: '5px' }}
                                        />
                                        <select
                                            name="importance"
                                            value={editTask.importance}
                                            onChange={(e) => setEditTask({ ...editTask, importance: e.target.value })}
                                            style={{ marginRight: '10px', padding: '5px' }}
                                        >
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                                        <select
                                            name="difficulty"
                                            value={editTask.difficulty}
                                            onChange={(e) => setEditTask({ ...editTask, difficulty: e.target.value })}
                                            style={{ marginRight: '10px', padding: '5px' }}
                                        >
                                            <option value="easy">Easy</option>
                                            <option value="medium">Medium</option>
                                            <option value="hard">Hard</option>
                                        </select>
                                        <input
                                            type="date"
                                            name="deadline"
                                            value={editTask.deadline}
                                            onChange={(e) => setEditTask({ ...editTask, deadline: e.target.value })}
                                            style={{ marginRight: '10px', padding: '5px' }}
                                        />
                                        <button onClick={() => handleUpdateTask(editTask.id)} style={{ padding: '5px 10px' }}>
                                            Enregistrer
                                        </button>
                                        <button onClick={() => setEditTask(null)} style={{ marginLeft: '10px', padding: '5px 10px' }}>
                                            Annuler
                                        </button>
                                    </div>
                                )}
                            </>
                        }
                    />
                    {/* Routes vers les pages spécifiques */}
                    <Route path="/add-task" element={<AddTaskPage />} />
                    <Route path="/delete-task" element={<DeleteTaskPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
