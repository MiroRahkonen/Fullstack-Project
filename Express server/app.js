const express = require('express');
const path = require('path');
const routeRouter = require('./routes/api/members');
const exphbs = require('express-handlebars');
const Members = require('./Members');


const app = express();

app.use(express.json());

app.get('/',(req,res)=> res.render('index',{
    title: 'Member App',
    Members
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.engine('handlebars',exphbs.engine({defaultLayout: 'main'}));
app.set('view engine','handlebars');

app.use('/api/members',routeRouter);



const PORT = process.env.PORT || 3000;


app.listen(PORT,() => console.log(`Server listening to port: ${PORT}`));