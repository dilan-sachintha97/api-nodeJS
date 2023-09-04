/*
    express - >   (npm i express)
    nodemon-> (npm i nodemon -g)
    mongodb - >   connect [mongoose  (npm i mongoose)]
    run -> node index,js
*/

const express = require('express'); // Import express
const  mongoose = require('mongoose'); // Import mongo db
require('dotenv').config();

const bodyParser = require('body-parser')   // to allow request



mongoose.set('strictQuery',true)
//==========================
 const UserRoute = require('./routes/UserRoute');

//==========================
const app = express();
const serverPort = process.env.SERVER_PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/pos').then(()=>{
        app.listen(serverPort, () => {
            console.log(`Server Running on Port ${serverPort}`);
        });
})
//======================
 app.use('/api/v1/user',UserRoute)
//======================

app.get('/api/v1/test', (req, res) => {
    res.status(200).json({'message': 'success!'});
});

