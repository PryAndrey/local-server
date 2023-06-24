const express = require('express');
const fs = require('fs')
const PORT = 3001

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let dataStore = {};

const DATABASE_FILE = 'test.json'; // Constant for the database file name

app.use(express.urlencoded({extended: false}))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Request-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

require('./routes')(app)
app.listen(PORT, () => {
    console.log(`Server starting on port ${PORT}`)
})