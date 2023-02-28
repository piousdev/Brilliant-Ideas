import express from 'express';
import mariadb from 'mariadb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'brilliant_minds',
    connectionLimit: 5
});

app.use(express.json());

app.get('/ideas', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const rows = await connection.query('SELECT * FROM ideas');
        res.send(rows);
    } catch (err) {
        console.error('Failed to get ideas from database:', err);
        res.status(500).send('Failed to get ideas from database');
    } finally {
        if (connection) await connection.release();
    }
});

// app.post('/ideas', async (req, res) => {
//     const { title, description } = req.body;
//     let connection;
//     try {
//         connection = await pool.getConnection();
//         const result = await connection.query(
//             'INSERT INTO ideas (title, description) VALUES (?, ?)',
//             [title, description]
//         );
//         const id = result.insertId;
//         res.send({ id, title, description });
//     } catch (err) {
//         console.error('Failed to create idea:', err);
//         res.status(500).send('Failed to create idea');
//     } finally {
//         if (connection) await connection.release();
//     }
// });

// app.post('/ideas', async (req, res) => {
//     const { title, description } = req.body;
//     let connection;
//     try {
//         connection = await pool.getConnection();
//         const result = await connection.query(
//             'INSERT INTO ideas (title, description) VALUES (?, ?)',
//             [title, description]
//         );
//         const id = result.insertId;
//         res.setHeader('Content-Type', 'application/json'); // <-- set the Content-Type header to application/json
//         res.send({ id, title, description });
//     } catch (err) {
//         console.error('Failed to create idea:', err);
//         res.status(500).send('Failed to create idea');
//     } finally {
//         if (connection) await connection.release();
//     }
// });

app.post('/ideas', async (req, res) => {
    const { title, description } = req.body;
    let connection;
    try {
        connection = await pool.getConnection();
        const result = await connection.query(
            'INSERT INTO ideas (title, description) VALUES (?, ?)',
            [title, description]
        );
        const id = result.insertId;
        res.setHeader('Content-Type', 'application/json'); // <-- set the Content-Type header to application/json
        res.send({ id: Number(id), title, description }); // <-- convert id to a number
    } catch (err) {
        console.error('Failed to create idea:', err);
        res.status(500).send('Failed to create idea');
    } finally {
        if (connection) await connection.release();
    }
});



app.delete('/ideas/:id', async (req, res) => {
    const id = req.params.id;
    let connection;
    try {
        connection = await pool.getConnection();
        const result = await connection.query(
            'DELETE FROM ideas WHERE id = ?',
            [id]
        );
        if (result.affectedRows === 0) {
            res.status(404).send('Idea not found');
        } else {
            res.send('Idea deleted successfully');
        }
    } catch (err) {
        console.error('Failed to delete idea:', err);
        res.status(500).send('Failed to delete idea');
    } finally {
        if (connection) await connection.release();
    }
});

app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.use((err, req, res) => {
        console.error(err);
    console.log(res);
    res.status(500).send('Internal server error');
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// app.listen(process.env.PORT, () => {
//     console.log(`Server listening on port ${process.env.PORT}`);
// });

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});