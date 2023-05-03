const express = require('express');
const app = express()

const notFound=require("./middlewares/not-found")
const errorHandlerMiddleware=require("./middlewares/error-handler")
const connectDb=require("./db/database.js")
const port=2000
require("dotenv").config()
const adminRoute=require("./routes/admin")
const DrillSupervisorRoute=require("./routes/drillSupervisor")
const DrillOperatorRoute= require("./routes/drillOperator")
const adminSupRoute=require("./routes/supAdmin")

var cors = require('cors');
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use(express.json() )
app.use(errorHandlerMiddleware)
app.use("/api/admin",adminRoute)
app.use("/api/drillSupervisor",DrillSupervisorRoute)
app.use("/api/drillOperator",DrillOperatorRoute)
app.use("/api/adminSup",adminSupRoute)



app.get("/", (req, res) => {
    res.send('hello');
});







const start=async()=>{
    try {
    await connectDb(process.env.Mongo_URI)
    app.listen(port,console.log("server on port 6000 is running"))


} catch (error) {
    console.log(error)
}

}
start()

module.exports = app;