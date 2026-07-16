const jwt = require('jsonwebtoken');

exports.generateToken = async (res,userId)=>{
    try {
        const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.cookie("jwt",token,{
            maxAge:7 * 24 * 60 * 60 * 1000,
            httpOnly: true,   //it prevents the xss attacks 
            sameSite: "lax",   
            secure: true  
        })

        return token
    } catch (error) {
        console.log(error)
    }
}