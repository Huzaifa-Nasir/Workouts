const User = require('../model/User');
const jwt = require('jsonwebtoken');



const createYourToken = (_id) =>{
   return jwt.sign({_id}, process.env.SECRET, {
        expiresIn:'3d'
    })

}

module.exports.signupUser= async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.userSignup(email,password);
        const token  = createYourToken(user._id);
        res.status(200).json({email,token});
    }
    catch(error)
    {
     res.status(400).json({error:error.message});
  
    }
}
module.exports.loginUser= async(req,res)=>{
    const {email,password} = req.body;
    try
    {
        const user = await User.login(email,password);
        const token  = createYourToken(user._id);
        res.status(200).json({email,token});

       
    }
    catch(error)
    {
        res.status(400).json({error:error.message});
    }
}


