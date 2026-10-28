  const dbconnection=require("../db/dbconfig")
 const bcrypt=require(`bcrypt`)
  const {dtatuscode, StatusCodes}=require('http-status-codes')
  const jwt = require('jsonwebtoken');
 async function register(req,res) {
    const {username,firstname,lastname,email,password}=req.body;
    if (!email || !password || !lastname || !firstname || !username ) {
      return res.status(StatusCodes.BAD_REQUEST).json({msg:"please provide all requred information "})
    } 
    

    
    try {


      const [user]=await dbconnection.query("SELECT username,userId from users where username=? or email=?",[username,email])
      //  return res.json({user:user})
      
  if(user.length>0){
   return res.status(StatusCodes.BAD_REQUEST).json({msg:"user already registered"})
  }

if(password.length<=8){
  return res.status(StatusCodes.BAD_GATEWAY).json({msg:"password must be atleast 8 charachter "})
}
    

//encryption part to hide the password from data base
const salt= await bcrypt.genSalt(10)
const hashedpassword=await bcrypt.hash(password,salt)



      await dbconnection.query("INSERT INTO users (username,firstname,lastname,email,password) VALUES (?,?,?,?,?)",[username,firstname,lastname,email,hashedpassword])
       return res.status(StatusCodes.ACCEPTED).json({msg:"user created "})


    } catch (error) {
      console.log(error.message);
      return res.status(StatusCodes.BAD_GATEWAY).json({msg:"some thing went wrong ,try again "}) 
    
    }


}

 
async function login(req,res) {
      
const {email,password}=req.body;
if(!email || !password ){
  return res.status(StatusCodes.BAD_REQUEST).json({msg:"please provide all requred information "})
    } 


  try {
 const [user]=await dbconnection.query("SELECT username,userId,password from users where email=?",[email])
      // return res.json({user:user})
      if (user.length==0) {
        return res.status(StatusCodes.BAD_GATEWAY).json({msg:"ivalide crendential please try again! "})
      }  
    //compare password 
    
    const ismatch= await bcrypt.compare(password,user[0].password)
    if (!ismatch) {
       return res.status(StatusCodes.BAD_GATEWAY).json({msg:"ivalide crendential please try again! "})
    }  
    const username=user[0].username
    const userid=user[0].userid  
   const token= jwt.sign({username,userid},"secret",{expiresIn:"1d"} )  
    
    return res.status(StatusCodes.OK).json({msg:"user login successfully ",token})
    
  } catch (error) {
     console.log(error.message);
      return res.status(StatusCodes.BAD_GATEWAY).json({msg:"some thing went wrong ,try again "}) 
    
  }


}


  














async function checkUser(req,res) {
  const username=req.user.username;
  const userid=req.user.userid;
  res.status(StatusCodes.OK).json({msg:"valid user ",username,userid})
 
}

module.exports={register,login,checkUser}