const express = require('express');
const server = express();
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createPool({
    host: "database",
    user: "test",
    password: "test",
    database: "mydatabase",
});

server.use(express.json());
server.use(cors());


//CREATE : ajout d'une tache
server.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    const sql = 'INSERT INTO tasks (title, description) VALUES (?, ?)';
    db.query(sql, [title, description], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erreur lors de l’ajout de la tâche.');
        } else {
            res.status(201).send({ message: 'Tâche ajoutée avec succès', taskId: result.insertId });
        }
    });
});

// READ : Afficher toutes les tâches
server.get('/tasks', (req, res) => {
    const sql = 'SELECT * FROM tasks';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erreur lors de la récupération des tâches.');
        } else {
            res.status(200).send(results);
        }
    });
});

// UPDATE : Modifier une tâche
server.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const sql = 'UPDATE tasks SET title = ?, description = ? WHERE id = ?';
    db.query(sql, [title, description, id], (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erreur lors de la mise à jour de la tâche.');
        } else {
            res.status(200).send({ message: 'Tâche mise à jour avec succès' });
        }
    });
});

// DELETE : Supprimer une tâche
server.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM tasks WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erreur lors de la suppression de la tâche.');
        } else {
            res.status(200).send({ message: 'Tâche supprimée avec succès' });
        }
    });
});

server.listen(3001, () => console.log('Serveur démarré sur le port 3001'));