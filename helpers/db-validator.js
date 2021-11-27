const Rols = require('../models/role');
const Usuario = require('../models/usuario'); 


const esRolValido = async( rol = '') => {
           
    const existeRol = await Rols.findOne({rol});
    if (!existeRol){
        throw new Error(`el rol ${rol} no se encuentra registradooo`);
    }
}

const esCorreoValido = async( correo = '') => {
           
    const existeCorreo = await Usuario.findOne({correo});
    if (existeCorreo){
        throw new Error(`el correo electronico: ${correo}, ya se encuentra registrado`);
    }
}

const esIdValido = async( id ) => {
           
    const existeId = await Usuario.findById(id);
    if (!existeId){
        throw new Error(`el ID ${id}, no existe`); 
    }
}

module.exports = {
    esRolValido,
    esCorreoValido,
    esIdValido
}