const express=require("express");
const mongoose=require("mongoose");
const router=require("./routes/bookroutes");
const app=express();

app.use(express.json())
app.use("/books",router);

mongoose.connect("mongodb+srv://admin:123@cluster0.picglcu.mongodb.net/bootstore?retryWrites=true&w=majority")
.then(()=>console.log("Connected to database"))
.then(()=>{
    app.listen(5000);
}
).catch((err)=>console.log(err));


