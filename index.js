/*
Verbos HTTP

GET - Obtener recursos
POST - Almacenar/crear recursos
PATCH (Actualización de un registro específico)
PUT - Modificar un recurso
DELETE - Borrar recurso
*/
const bodyparser = require('body-parser');
const express = require('express');
const res = require('express/lib/response');
const app = express();
const { pokemon } = require('./pokedex.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res,next) => {
    return res.status(200).send("Bienvenido al Pokedex");
})

app.post("/pokemon",(req,res,next) => {
    return res.status(200).send(req.body);
});

app.get('/pokemon',(req, res,next)=>{
    return res.status(200).send(pokemon);
});

app.get('/pokemon/:id([0-9]{1,3})',(req,res,next)=>{
    const id = req.params.id - 1;
       return (id >= 0 && id <= 150) ? 
       res.status(200).send(pokemon[req.params.id -1]): 
       res.status(404).send("Pokémon no encontrado");
});

app.get('/pokemon/:name([A-Za-z]+)',(req,res,next)=>{
    const name = req.params.name;

    const pk = pokemon.filter((p) => {
       return (p.name.toUpperCase() == name.toUpperCase()) && p;
    });    
        (pk.length > 0) ? 
        res.status(200).send(pk) : 
        res.status(404).send("Pokemon no encontrado");   
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server is running...");
});