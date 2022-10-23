require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bp = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(bp.urlencoded({extended: true}));

const router = require('./routes/routes.js');
app.use(router);

app.listen(process.env.PORT, ()=>{
    console.log(`Listen on port ${process.env.PORT}`);
});

