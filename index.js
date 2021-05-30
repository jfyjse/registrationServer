const express = require("express");
const app= express()
const dataser = require("./services/data.service")
const session = require("express-session");

app.use(express.json());



app.post('/signup',(req,res)=>{
    dataser.signup(req.body.fname,req.body.lname,req.body.email,req.body.password,req.body.city)
    .then(result =>{res.status(result.statusCode).json(result)})
})


app.post('/login', (req,res)=>{
    dataser.login(req.body.email,req.body.password)
    .then(result=>{res.status(result.statusCode).json(result)})
})





app.listen(3000,()=>{
    console.log("Started Listening at Port 3000");
})