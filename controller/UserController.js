const UserSchema = require('../model/User');

const register = (request,response)=>{
    const dto = new UserSchema({
        name:request.body.name,
        email:request.body.email,
        password:request.body.password,
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
}

module.exports = {register}   // register eka wena anaka idan access krnn