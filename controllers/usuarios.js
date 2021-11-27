const {response , request} = require('express');
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs');


const usuarioGet = async (req = request , res = response) => {
    
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite)),
    ])

    res.json({
        total,
        usuarios
    });
}

const usuarioPut = async (req , res = response) => {

    const { id } = req.params;
    const { _id, contraseña, google, correo, ...resto} = req.body;

    //TODO validar

    if (contraseña){
    //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.contraseña = bcryptjs.hashSync(contraseña,salt);        
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg:'Usuario PUT la Modificacion se ha realizado correctamente ',
        usuario
    });
}

const usuarioPost = async (req , res = response) => {

    const {nombre, correo, contraseña, rol} = req.body;
    const usuario = new Usuario({ nombre, correo, contraseña, rol });
    
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.contraseña = bcryptjs.hashSync(contraseña,salt);

    //Guardarmos en la base de datos para hacerlo debe de estar asincronbico con AWAIT
    await usuario.save();

    res.json({usuario});

    res.json({
        msg:'Usuario POST Actualizado',
        usuario
    });

}

const usuarioDelete = async (req , res = response) => {
    
    const {id} = req.params;

    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false}); 

    res.json({
        usuario
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