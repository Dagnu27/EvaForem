const express=require('express')
const app=express();
const port=5500;

const userRoutes=require("./routes/userRoute")

//user middle were 
app.use("/api/users",userRoutes)
//quation middle were ?
//answer middle were ?

app.listen(port,(err)=>{
    if (err) {
        console.log(err.message);
        
    }else{
         console.log(`listening on ${port}`);
             
    }
})
       










