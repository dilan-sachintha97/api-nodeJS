/*
    express - >   (npm i express)
    nodemon-> (npm i nodemon -g)
    mongodb - >   connect [mongoose  (npm i mongoose)]
    run -> node index,js
*/

const express = require('express'); // Import express
const  mongoose = require('mongoose'); // Import mongo db
mongoose.set('strictQuery',true)
const app = express();

mongoose.connect('mongodb://localhost:27017/pos').then(()=>{
        app.listen(3000, () => {
            console.log("Server Running!");
        });
    })


app.get('/api/v1/test', (req, res) => {
    res.status(200).json({'message': 'success!'});
});

