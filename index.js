const express = require("express");
const app= express()
const dataservice = require("./services/dataservice");
const session = require("express-session");




























app.listen(3000,()=>{
    console.log("Started Listening at Port 3000");
})