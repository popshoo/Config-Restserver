const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es totalmente obligatorio'],
        unique: true
    },
    correo: {
        type: String,
        required: [true, 'El Correo es totalmente obligatorio'],
        unique: true
    },
    contraseña: {
        type: String,
        required: [true, 'La Contraseña es totalmente obligatoria'],
        unique: true
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE','USER_ROLE','VENTAS_ROLE','STAFF_ROLE',]
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

UsuarioSchema.methods.toJSON = function (){
    const { __v, contraseña, ...usuario } = this.toObject();
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);