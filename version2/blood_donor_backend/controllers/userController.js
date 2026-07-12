const user = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { generateToken } = require('../lib/utils.js');
const connectDb = require('../lib/db.js');


exports.signup = async (req,res)=>{
    await connectDb();
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password){
           return res.status(400).json({message:"All fields are mandatory!"});
        }
        if(!validator.isEmail(email)){
           return res.status(400).json({message:"Not a valid Email!"});
        }
        if(!validator.isStrongPassword(password)){
           return res.status(400).json({message:"Password Needs to be Strong!"})
        }

        const isEmail = await user.findOne({email:email});

        if(isEmail){
            return res.status(400).json({message:"Email Already exists"})
        }
        const newpw = await bcrypt.hash(password,10);

        const newuser = await user.create({name,email,password:newpw});

        generateToken(res,newuser._id);

        return res.status(200).json({message:"Signed Up succesfully!"});
        

        return res.status(200).json({message:"Signed Up succesfully"},{name,email,password})
    } catch (error) {
        console.log(error);
    }
}

exports.login = async (req,res)=>{
    await connectDb();
    try {
        const {email,password} = req.body;
        if(!email || !password){
           return res.status(400).json({message:"All fields are mandatory!"});
        }
        if(!validator.isEmail(email)){
           return res.status(400).json({message:"Not a valid Email!"});
        }
       

        const findedUser = await user.findOne({email:email});
        if(!findedUser){
            return res.status(400).json({message:"Invalid Credentials"})
        }

        const verify = await bcrypt.compare(password, findedUser.password);

        if(!verify){
            return res.status(400).json({message:"Invalid Credentials"})
        }
        
        generateToken(res,findedUser._id);

        return res.status(200).json({message:"Logged In succesfully"},{email})
    } catch (error) {
        console.log(error);
    }
}