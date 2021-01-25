const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path:'./.env'});

const app = express();
const port = 3000;

const path = require('path');
const publicDirection = path.join(__dirname, '/public');
app.use(express.static(publicDirection));

app.set('view engine', 'hbs');
app.set('views','./views');

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/', require('./router'))

app.listen(port, () => {
    console.log("Server is listening in port " + port);
})