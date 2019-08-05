const express=require('express');
const path=require('path');
var session = require('express-session');
const app=express();
const pageRouter=require('./routes/pages');

//for body parser
app.use(express.urlencoded({extended:false}));

//serve static files
//modified
app.use(express.static(path.join(__dirname,'public')));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//template engine
/*
    *app.set('views',path.join(__dirname,'views'));
    *app.set('view engine','pug');
*/

//set template engine (html)
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//routers
app.use(pageRouter);

//setting up the server
app.listen(3000, ()=>{
    console.log('server running on port 3000...');
});


module.exports=app;