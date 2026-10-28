const express=require('express')
const app=express();
const port=5500;

const cors=require('cors')
app.use(cors());


//db connection
const dbconnection=require("./db/dbconfig")


//user route middle ware
const userRoutes=require("./routes/userRoute")
const quationRoutes=require("./routes/quationRoute")
//json  middleware to extract the json file  
app.use(express.json())

//user middle were 
app.use("/api/users",userRoutes)
//quation middle were ?
app.use("/api/quastions",quationRoutes)
//answer middle were ?  

 async function start() {
    try {
   const result= await dbconnection.execute("select  'test' ")

  app.listen(port)
  console.log("data base connection stablished ");
  console.log(`listning on ${port}`);
  
  
    
} catch ( error) {
    console.log(error.message);
    
}
 }
start();


