const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
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
        return response;
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
    let result = [];
    let set = new Set();
    if(req.query.url && req.query.url.length > 0) {
        req.query.url.forEach(async (url) => {
            if(URLS.includes(url)) {
                const data = await getData(url);
                console.log(data.data.numbers)
                data.data.numbers.forEach((num) => {
                    set.add(num);
                })
                // console.log(set)
            }
        })
        console.log(set)
        // res.json({ result });
    }
    // console.log(set)
    // if(numbers.length > 0) {
    //     numbers.sort((a, b) => a - b);
    // }
    // console.log(result)
    set?.forEach((num) => {
        result.push(num);
    })
    console.log(result)
    res.json({ numbers: result });
    
})


// listen
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
})