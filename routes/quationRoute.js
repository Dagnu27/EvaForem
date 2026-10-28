const express=require('express')
const router=express.Router()

//authentication middleware 

const authmiddleware=require('../middelware/authmiddleware')

router.get("/all-quations" ,authmiddleware,(req,res)=>{
  res.send("send quation ")
})

module.exports=router