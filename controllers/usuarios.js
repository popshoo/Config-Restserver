const {response , request} = require('express');


const usuarioGet = (req = request , res = response) => {
    const query = req.query;

    res.json({
        msg:'Usuario GET Actualizado',
        query
    });
}

const usuarioPut = (req , res = response) => {

    const { id, nombre ='', apikey,  page, limitPage="890" } = req.params;

    res.json({
        msg:'Usuario PUT Actualizado',
        id,
        nombre, 
        apikey,
        page,
        limitPage
    });
}

const usuarioPost = (req , res = response) => {

    const body = req.body;
    
    res.json({
        msg:'Usuario POST Actualizado',
        body
    });
}

const usuarioDelete = (req , res = response) => {
    
    res.json({
        msg:'Usuario DELETE Actualizado'
    });
}

const usuarioPatch = (req , res = response) => {
    
    res.json({
        msg:'Usuario PATCH Actualizado'
    });
}

module.exports = {
    usuarioGet,
    usuarioPut,
    usuarioPost,
    usuarioDelete,
    usuarioPatch,
}