import express from 'express';
import mariadb from 'mariadb';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';


dotenv.config();

const app = express();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'brilliant_minds',
    connectionLimit: 5
});

// Convert the URL of the current module to a file path
const __filename = fileURLToPath(import.meta.url);

// Get the directory path of the current module
const __dirname = dirname(__filename);

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../client')));

app.get('/ideas', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const rows = await connection.query('SELECT * FROM ideas');
        console.log(`Retrieved ${rows.length} rows from database`);
        res.send(rows);
    } catch (err) {
        console.error('Failed to get ideas from database:', err);
        res.status(500).send('Failed to get ideas from database');
    } finally {
        if (connection) await connection.release();
    }
});

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
        res.setHeader('Content-Type', 'application/json');
        res.send({ id: Number(id), title, description });
    } catch (err) {
        console.error('Failed to create idea:', err);
        res.status(500).send('Failed to create idea');
    } finally {
        if (connection) await connection.release();
    }
});

app.route('/ideas/:id')
    .get(async (req, res) => {
        const id = req.params.id;
        // is the id received correctly?
        console.log(`Received request for idea with ID ${id}`);
        let connection;
        try {
            connection = await pool.getConnection();
            const sql = 'SELECT id, title, description, created_at FROM ideas WHERE id = ?';
            // is the SQL query correct?
            console.log(`Executing SQL query: ${sql} with ID ${id}`);
            const [idea] = await connection.query(sql, [id]).catch((error) => {
                console.error(`Error executing SQL query: ${sql} with ID ${id}`, error);
            });
            console.log('Database response:', idea);
            // is the idea retrieved correctly?
            console.log(`Retrieved idea from database:`, idea);
            if (!idea) {
                res.status(404).send(`Idea with id ${id} not found`);
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.json(idea);
            }
        } catch (err) {
            console.error(`Failed to get idea with id ${id} from database:`, err);
            res.status(500).send(`Internal server error, failed to get idea with id ${id} from database`);
        } finally {
            if (connection) await connection.release();
        }
    })
    .put(async (req, res) => {
        const { title, description } = req.body;
        const { id } = req.params;
        console.log(`Updating idea ${id} with title ${title} and description ${description}`);
        let connection;
        try {
            connection = await pool.getConnection();
            await connection.query(
                'UPDATE ideas SET title=?, description=? WHERE id=?',
                [title, description, id]
            );
            const updatedIdea = {
                id: Number(id),
                title,
                description,
            };
            res.setHeader('Content-Type', 'application/json');
            res.send(updatedIdea);
        } catch (err) {
            console.error('Failed to update idea:', err);
            res.status(500).send('Failed to update idea');
        } finally {
            if (connection) await connection.release();
        }
    })
    .delete(async (req, res) => {
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
    res.status(500).send('Internal server error');
});


app.listen(3000, () => {
    console.log('Server listening on port 3000');
});