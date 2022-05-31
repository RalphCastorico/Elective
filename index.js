import express from 'express';
import bodyParser from 'body-parser';

import libraryRoutes from './routes/library.js';

const app = express();
const PORT = 5050;


app.use(bodyParser.json());

app.use('/library', libraryRoutes)

//Get Request
app.get('/', (req, res) => {
    res.send('Welcome to our Library')
});

app.listen(PORT, () => console.log(`Server is running on port: https://localhost:${PORT}`));