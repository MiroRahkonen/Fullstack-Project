const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/config');
const users = require('./routes/users');

// Database connection
mongoose.connect(config.databaseURL);


// App initialization
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.use('/users',users);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

const port = 3000;



app.get('/',(req,res)=>{
    res.send('Invalid endpoint');
})


app.listen(port,()=>{
    console.log(`Server started on port: ${port}`);
})