const cors = require('cors')
const express = require('express');
const { dbConnection } = require('../database/config');
const port = process.env.PORT


class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT


        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //DB CONNECTION
        this.conectarDB();

        //MIDDLEWARES
        this.middlewares();

        //Rutas de mi App
        this.routes();
    }

        async conectarDB() {
            await dbConnection();
        }


    middlewares() {

        //CORS
        this.app.use( cors() );

        //Lectura y Parceo del body
        this.app.use( express.json() );

        //Directorio publico
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath , require('../routes/usuarios'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        })
    }
}

module.exports = Server;