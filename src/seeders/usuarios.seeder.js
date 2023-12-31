require('dotenv').config();
require('../configs/db.config');
const bcrypt = require('bcrypt');
const saltosBycript = parseInt(process.env.SALTOS_BCRYPT);

const Usuario = require('../models/usuario.model');
const mongoose = require('mongoose');

const usuarios = [
    {nombre: "nombre2", email: "email2@gmail.com", password: bcrypt.hashSync('1234', saltosBycript)},
    {nombre: "nombre3", email: "email3@gmail.com", password: bcrypt.hashSync('1234', saltosBycript)},
    {nombre: "nombre4", email: "email4@gmail.com", password: bcrypt.hashSync('1234', saltosBycript)},
    {nombre: "nombre5", email: "email5@gmail.com", password: bcrypt.hashSync('1234', saltosBycript)},
    {nombre: "nombre6", email: "email6@gmail.com", password: bcrypt.hashSync('1234', saltosBycript)},
    {nombre: "nombre7", email: "email7@gmail.com", password: bcrypt.hashSync('1234', saltosBycript)},
    {nombre: "nombre8", email: "email8@gmail.com", password: bcrypt.hashSync('1234', saltosBycript)},
    {nombre: "nombre9", email: "email9@gmail.com", password: bcrypt.hashSync('1234', saltosBycript)},
    {nombre: "nombre1", email: "email1@gmail.com", password: bcrypt.hashSync ('1234', saltosBycript)},
    {nombre: "nombre10",email: "email10@gmail.com", password: bcrypt.hashSync( '1234', saltosBycript)},
];

Usuario.deleteMany({})
    .then(() => {
        return Usuario.insertMany(usuarios);
    })
    .then(() => {
        console.log("usuarios creados");
        mongoose.connection.close();
    })
    .catch((error) => {
        console.log(error);
        mongoose.connection.close();
    });