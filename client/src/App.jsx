import './styles.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Axios from 'axios';
import AddTaskPage from './AddTaskPage';
import DeleteTaskPage from './DeleteTaskPage';
import EditTaskPage from './EditTaskPage';

const App = () => {
    const [tasks, setTasks] = useState([]);
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

    return (
        <Router>
            <div className="app-container">
                <aside className="sidebar">
                    <nav>
                        <ul className="nav-links">
                            <li><Link to="/">Accueil</Link></li>
                            <li><Link to="/add-task">Ajouter une tâche</Link></li>
                            <li><Link to="/delete-task">Supprimer une tâche</Link></li>
                            <li><Link to="/edit-task">Modifier une tâche</Link></li>
                        </ul>
                    </nav>
                </aside>
                <main className="content">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <div className="tasks-list">
                                    <h1>To-Do List</h1>
                                    {tasks.map((t) => (
                                        <div key={t.id} className="task-item">
                                            <h2>{t.title}</h2>
                                            <p>{t.description || 'Aucune description fournie.'}</p>
                                            <div className="task-details">
                                                <span className={`label importance-${t.importance}`}>
                                                    Importance : {t.importance}
                                                </span>
                                                <span className={`label difficulty-${t.difficulty}`}>
                                                    Difficulté : {t.difficulty}
                                                </span>
                                                <span className="label deadline">
                                                    Deadline : {t.deadline || 'Non spécifiée'}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                        />
                        <Route path="/add-task" element={<AddTaskPage />} />
                        <Route path="/delete-task" element={<DeleteTaskPage />} />
                        <Route path="/edit-task" element={<EditTaskPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
