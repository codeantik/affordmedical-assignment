const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const valid = require('valid-url');
const axios = require('axios').default;


const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


// utils


const URLS = [
    'http://localhost:8090/rand', 
    'http://localhost:8090/fibo', 
    'http://localhost:8090/primes',
    'http://localhost:8090/odd'
]


const getData = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data.numbers;
    } catch (error) {
        console.log(error);
    }
}


// routes

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/numbers', (req, res) => {
    // res.send('Numbers');
    console.log(req.query)
    let set = new Set();
    let result = [];
    if(req.query.url) {
        req.query.url?.forEach(async (url) => {
            if(valid.isWebUri(url)) {
                const data = await getData(url);
                data.forEach(num => set.add(num));
                console.log(data);
                result.push(data);
            }
        })

    }
    
    console.log(result);
    console.log(set)

    set?.forEach((num) => {
        result.push(num);
    })
    res.json({ numbers: result });
    
})


// listen
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
})