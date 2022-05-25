const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');


const app = express();
const PORT = process.env.PORT || 3000;


// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


// utils

const items = ['bonfire', 'fibonacci', 'primes', 'odd', 'rand', 'even', 'cardio', 'case', 'character', 'bonsai'];



// routes
app.get('/', (req, res) => {
    res.send('server running');
})

app.get('/prefixes', (req, res) => {
    console.log(req.query)
    let keywords = [], result = [];
    if(req.query.keywords) {
        keywords = req.query.keywords.split(',');
        console.log(keywords);
    }

    let found = []
    keywords.forEach((keyword) => {
        if(items.includes(keyword)) {
            // const prefix = shortest-unique-prefix(items) // could not implement shortest unique prefix
            result.push({
                keyword,
                status: 'found',
                prefix: 'prefix'
            })
        } else {
            result.push({
                keyword,
                status: 'not_found',
                prefix: 'not_applicable'
            })
        }
    })

    res.json({ result });
})


// listen
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
})