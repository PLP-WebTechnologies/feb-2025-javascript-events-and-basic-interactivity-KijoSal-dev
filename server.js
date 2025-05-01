const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Add this:
app.get('/', (req, res) => {
    res.send('Welcome to the registration API!');
});

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    console.log('Received registration data:', { username, email, password });

    res.json({ message: `Registration successful for ${username}!` });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
