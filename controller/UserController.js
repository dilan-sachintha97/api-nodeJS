const UserSchema = require('../model/User');
const bcrypt = require('bcrypt')


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
                    let responseUserData = {
                        userEmail:result.email,
                        token:'****',
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

module.exports = {register}   // register eka wena anaka idan access krnn