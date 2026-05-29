let express = require("express")
let mongoose = require("mongoose")
let cors = require("cors")
const rt = require("./Routes/rt");
const billingroute = require("./Routes/billingroute");
const prescriptionroute = require("./Routes/prescriptionroute");
const reportroute = require("./Routes/reportroute");
require('dotenv').config();

mongoose.connect(process.env.MONGODB).then(()=> {
    console.log("Connection Established")
}).catch((err)=> {
    console.log("Connection Failed",err)
})

let app = express()
app.listen(process.env.PORT)
app.use(express.json())
app.use(cors())
app.use("/",rt)
app.use("/billingroute",billingroute)
app.use("/prescription",prescriptionroute)
app.use("/report",reportroute)