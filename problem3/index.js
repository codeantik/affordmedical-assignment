const cors = require('cors')
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


const demoBody = {
    username: 'test',
    password: 'test',
    email: 'email'
}

const user = {};


app.get('/', (req, res) => {
    res.send('Hello World!');
})


app.post('/register', (req, res) => {
    const body = req.body;
    user[body.password] = body
    res.send({ user, message: 'user registered' });
    
})


app.post('/login', (req, res) => {
    const body = req.body;
    if(body) {
        jwt.sign({
            password: body.password,
        }, 'secret', (err, token) => {
            if(err) {
                res.status(500).send(err);
            } else {
                res.status(200).json({ token, message: 'Sucessfully login!' });
            }
        })
    }
    
})




app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})