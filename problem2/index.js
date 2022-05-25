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

const isUniquePrefix = (items, prefix) => {
    return !items.some(item => item.startsWith(prefix))
  }
  
  const buildPrefix = (item, items) => {
    let prefix = ''
    for (const char of item) {
      prefix += char
      if (isUniquePrefix(items, prefix)) {
        break
      }
    }
    return prefix
  }

  const uniquePrefixes = (items, { alias } = {}) => {
    const output = alias ? {} : []
    for (const item of items) {
      // an array that excludes the present item
      const itemsWithoutItem = items.filter(element => element !== item)
      const validPrefix = buildPrefix(item, itemsWithoutItem)
  
      if (validPrefix) {
        if (alias) {
          output[validPrefix] = item
        } else {
          output.push(validPrefix)
        }
      }
    }
    return output
  }
  

  
  const prefixes = uniquePrefixes(items, { alias: false })


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
            console.log(prefixes);
            const prefix = prefixes.filter(prefix => keyword.startsWith(prefix))[0];
            // console.log(prefix);
            result.push({
                keyword,
                status: 'found',
                prefix
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