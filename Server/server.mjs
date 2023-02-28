import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { errorHandler } from './errorHandler.js';
import { notFoundHandler } from './notFoundHandler.js';
import { router as ideasRouter } from './ideas.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Serve static files from the client folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, '../client')));

// Mount the ideas router
app.use('/ideas', ideasRouter);

// Mount the 404 handler
app.use(notFoundHandler);

// Mount the error handler
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
