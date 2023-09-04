const UserSchema = require('../model/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const {request, response} = require("express");


const register = (request,response)=>{
    UserSchema.findOne({email:request.body.email}).then(result=>{
        if (result == null){  // no same user in db
            bcrypt.hash(request.body.password, 10, function(err, hash) {  // to encrypt password
                const dto = new UserSchema({
                    name:request.body.name,
                    email:request.body.email,
                    password:hash
                });

                dto.save().then(result =>{
                    const token = jwt.sign({
                                name:result.name,
                                email:result.email
                        }, process.env.SECRET_KEY);  // after save create token

                    let responseUserData = {
                        userEmail:result.email,
                        token:token,
                        status:201,
                        message:'success'
                    }
                    response.status(201).json(responseUserData);
                }).catch(error=>{
                    response.status(500).json(error);
                })
            });
        }else{
            // if user is already exit
            response.status(409).json({'message':'Already exits'});
        }
    })
}


const login = (request, response) => {
    UserSchema.findOne({ email: request.body.email }).then(results => {
        if (results != null) {
            // Find user with the provided email

            // Check password
            bcrypt.compare(request.body.password, results.password, function (err, result) {
                if (err) {
                    // Password does not match
                    response.status(403).json({ 'message': 'Forbidden' });
                }

                if (result) {
                    // Password matches, generate a new JWT token
                    const token = jwt.sign({
                        name: results.name,
                        email: results.email
                    }, process.env.SECRET_KEY);

                    let responseUserData = {
                        userEmail: results.email,
                        token: token, // Use the generated token
                        status: 201,
                        message: 'success'
                    }
                    response.status(201).json(responseUserData);
                } else {
                    // Password is incorrect
                    response.status(403).json({ 'message': 'Unauthorized' });
                }
            });

        } else {
            response.status(404).json({ 'message': 'User not found' });
        }
    })
}

module.exports = {register,login}   // register eka wena anaka idan access krnn