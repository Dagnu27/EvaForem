const dbconnection=require("../db/dbconfig")

 async function register(req,res) {
    const {username,firstname,lastname,email,password}=req.body;
    if (!email || !password || !lastname || !firstname || !username ) {
      return res.status(401).json({msg:"please provide all requred information "})
    } 
    
    
    try {


      const [user]=await dbconnection.query("SELECT username,userId from users where username=? or email=?",[username,email])
      //  return res.json({user:user})
      
  if(user.length>0){
   return res.status(400).json({msg:"user already registered"})
  }

      await dbconnection.query("INSERT INTO users (username,firstname,lastname,email,password) VALUES (?,?,?,?,?)",[username,firstname,lastname,email,password])
       return res.status(201).json({msg:"user created "})


    } catch (error) {
      console.log(error.message);
      return res.status(500).json({msg:"some thing went wrong ,try again "}) 
      
    }


}
 
async function login(req,res) {
  res.send("login")
}

async function checkUser(req,res) {
  res.send("checkUser")
}

module.exports={register,login,checkUser}