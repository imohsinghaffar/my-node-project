//Now we create express server
const express = require('express');
const app = express();
const port = 3002;
require('dotenv').config;

app.get('/', (req,res)=>{
    res.send('This is HomePage');
});
app.get('/user', (req,res)=>{
    res.send('This is userpage');
});
app.get('/productpage', (req,res)=>{
    res.send('This is product page');
});
app.get('/login', (req,res)=>{
    res.send('<h1>Login Here</h1>');
});

app.listen(process.env.PORT, (req,res)=>{
    console.log('Server is running at port', port);
})