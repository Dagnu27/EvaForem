const express =require(`express`)
const router=express.Router();
const {register,login,checkUser}=require('../controller/userControlller')

//register part 
router.post("/register",register)

// login part 
router.post("/login",login);  

//check user 
router.get("/check",checkUser)

module.exports=router