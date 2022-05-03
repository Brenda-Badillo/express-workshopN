const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');


pokemon.post("/",async(req,res,next) => {
    const {pok_name, pok_height, pok_weight, pok_base_experience}=rep.body
    
    if(pok_name && pok_height && pok_weight && pok_base_experience){
        let query = "INSERT INTO pokemon(pok_name, pok_height, pok_weight, pok_base_experience)"
        query += `VALUES ('${pok_name}',${pok_height},${pok_weight},${pok_base_experience})`;
  
        const rows = await db.query(query);
  
        if(rows.affectedRows==1){
            return res.status(201).json({code:201,message:"Pokemon insertado correctamente"});
        }

        return res.status(500).json({code:500, message: "Ocurrio un error"});
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos"});
});

pokemon.delete('/:id([0-9]{1,3})',async (req,res,next)=>{
    const query = `DELETE FROM pok_id=${req.params.id}`;

    const rows= await db.query(query);

    if(rows.affectedRows==1){
        return res.status(200).json({code:200,message:"Pokemon borrado correctamente"});
    }

    return res.status(400).json({code:404,message:"Pokemon no encontrado"});
});

pokemon.put('/:id([0-9]{1,3})',async (req,res,next)=>{
    const {pok_name, pok_height, pok_weight, pok_base_experience}=rep.body

    if(pok_name && pok_height && pok_weight && pok_base_experience){
        let query = `UPDATE pokemon SET pok_name='${pok_name}', pok_height=${pok_height}, `;
            query +=  `pok_weight=${pok_weight}, pok_base_experience=${pok_base_experience} WHERE pok_id=${req.params.id};)` 

            const rows = await db.query(query);

            if(rows.affectedRows==1){
                return res.status(200).json({code:200,message:"Pokemon actualizado correctamente"});
            }
    
            return res.status(500).json({code:500, message: "Ocurrio un error"});
        }
        return res.status(500).json({ code: 500, message: "Campos incompletos"});
        });

pokemon.get('/',async (req, res,next)=>{
    const pkmn = await db.query("SELECT * FROM pokemon");
    console.log(pkmn);
    return res.status(200).json({code:1,message: pkmn});
});

pokemon.get('/:id([0-9]{1,3})',async (req,res,next)=>{
    const id = req.params.id;
       if(id >= 0 && id <= 722){
       const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_id=" + id + ";");
       return res.status(200).json({code: 1, message:pkmn});
    } 
       return res.status(404).send({code:404, message:"Pokémon no encontrado"});
});
 
pokemon.get('/:name([A-Za-z]+)',async(req,res,next)=>{
    const name = req.params.name;
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name='"+name+"';")
        
        (pkmn.length > 0) ? 
        res.status(200).json({code: 1, message:pkmn}) : 
        res.status(404).send({code:404, message:"Pokémon no encontrado"}); 
    });
module.exports = pokemon;
