const CustomerSchema = require('../model/Customer');


const saveCustomer = (req,resp)=>{
    let customer = new CustomerSchema({
        name:req.body.name,
        address:req.body.address,
        contact:req.body.contact,
        salary:req.body.salary,
    });
    customer.save().then(result=>{
        resp.status(201).json(result);
    }).catch(err=>{
        resp.status(500).json(err);
    })
}
const findCustomer = (req,resp)=>{
    CustomerSchema.findOne({'_id':req.headers.id}).then(result=>{
        if(result != null){
            // if find user
            resp.status(200).json(result);
        }else{
            resp.status(404).json({'message':'Not found User'});
        }
    }).catch(err=>{
        resp.status(500).json(err);
    })
}
const updateCustomer = (req,resp)=>{
    CustomerSchema.findOneAndUpdate({'_id':req.headers.id, $set:{name:req.body.name, address:req.body.address, contact:req.body.contact, salary:req.body.salary}}).then(result=>{
        if(result.nModified > 0){
            // if find and update user
            resp.status(201).json(result);
        }else{
            resp.status(500).json({'message':'Something went wrong'});
        }
    }).catch(err=>{
        resp.status(500).json(err);
    })
}
const deleteCustomer = (req,resp)=>{
    CustomerSchema.findOneAndDelete({'_id':req.headers.id}).then(result=>{
        if(result.nModified > 0){
            // if find and delete user
            resp.status(201).json(result);
        }else{
            resp.status(500).json({'message':'Something went wrong'});
        }
    }).catch(err=>{
        resp.status(500).json(err);
    })
}
const findAllCustomers = (req,resp)=>{
    CustomerSchema.find().then(result=>{
            resp.status(200).json(result);
    }).catch(err=>{
        resp.status(500).json(err);
    })
}

module.exports= {saveCustomer,findCustomer,updateCustomer,deleteCustomer,findAllCustomers}