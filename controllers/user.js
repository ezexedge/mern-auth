const User = require('../model/user')

exports.read = (req,res) => {
    const userId  = req.params.id
    User.findById(userId).exec((err,user)=>{
        if(err || !user) {
            return res.status(400).json({
                error : 'user not found'
            })
        }
        user.hashed_password = undefined
        user.salt = undefined
        res.json(user)
    })
}

exports.update = (req,res)=>{
    const {name,password} =  req.body
    User.findOne({_id: req.user._id}, (err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: 'user not found'
            })
        }
        if(!name){
            return res.status(400).json({
                error: 'name is required'
            })
        }else{
            user.name = name
        }
        if(password){
            if(password > 6){
                return res.status(400).json({
                    error : 'password debe tener un minimo de 6 palabras'
                })
            }else{
                user.password = password
            }
        }
        user.save((err,updateUser)=>{
            if(err){
                return res.status(400).json({
                    error: 'user update failed'
                })
            }
            updateUser.hashed_password = undefined
            updateUser.salt = undefined
            res.json(updateUser)
        })
        
    })
}
