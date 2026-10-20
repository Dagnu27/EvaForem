const express=require('express')
const app=express();
const port=5500;

app.get('/',(req,res)=>{
    res.send("welcome back");
})


//register part 
app.post("/api/users/register",(req,res)=>{
    res.send("register user ")
})

// login part 
app.post("/api/users/login",(req,res)=>{
    res.send("login user ")
})


//check user 
app.get("/api/users/check",(req,res)=>{
    res.send("check user ")
})



// git rm -r --cached node_modules
app.listen(port,(err)=>{
    if (err) {
       console.log(err.message);
        
    }else{
         console.log(`listening on ${port}`);
             
    }
})