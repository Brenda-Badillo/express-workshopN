const express = require('express');
const app = express();

/*
Verbos HTTP

GET
POST
PATCH (Actualización de un registro específico)
PUT 
DELETE
*/ 
app.get("/",(req,res,next) => {
    res.status(200);
    res.send("Bienvenido al servidor");
})
app.listen(3000, ()=>{
    console.log("Server is running");
});