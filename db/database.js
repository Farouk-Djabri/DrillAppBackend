const mongoose= require("mongoose")
const dbUrl=""
mongoose.set('strictQuery', true)
mongoose.set('autoIndex', true);

const connectDb=(url)=>{

    return mongoose.connect(url).then(()=>console.log("connected to Database")).catch((err)=>console.log(err)) 

}
module.exports=connectDb;

