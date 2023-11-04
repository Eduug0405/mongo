const bcrypt = require('bcrypt');
const saltosBycript = parseInt(process.env.SALTOS_BCRYPT);
const usuarioModel = require('../models/usuario.model');
const UsuarioModel = require('../models/usuario.model');

// query string params
// /usuarios?page=1&limit=2
const index = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const skip = (page - 1) * limit;
        const usuarios = await UsuarioModel.find({ deleted: false }).skip(skip).limit(limit);

        let response = {
            message: "se obtuvieron correctamente los usuarios",
            data: usuarios
        }

        if (page && limit) {
            const totalUsuarios = await UsuarioModel.countDocuments({ deleted: false });
            const totalPages = Math.ceil(totalUsuarios / limit);

            response = {
                ...response,
                total: totalUsuarios,
                totalPages,
            }
        }

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al obtener los usuarios",
            error: error.message
        })
    }
}

// /usuarios/:id
const getById = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const usuario = await usuarioModel.findById(usuarioId);

        if (!usuario) {
            return res.status(404).json({
                message: "usuario no encontrado"
            });
        }

        return res.status(200).json({
            message: "se obtuvo el usuario correctamente",
            usuario,
        });
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al obtener el usuario",
            error: error.message
        })
    }
}

const create = async (req, res) => {
    try {
        let usuario = new UsuarioModel({
            nombre: req.body.nombre,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, saltosBycript),
            createdBy: req.usuario._id   
        });

        await usuario.save();

        return res.status(201).json({
            mensaje: "usuario creado exitosamente!"
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "no se pudo crear el usuario",
            error: error.message
        });
    }
}

// /usuario/:id
const updateParcial = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const datosActualizar = {
            ...req.body,
            updated_at: new Date()
        };

        const usuarioActualizado = await usuarioModel.findByIdAndUpdate(usuarioId, datosActualizar);

        if (!usuarioActualizado) {
            return res.status(404).json({
                message: "usuario no encontrado"
            });
        }

        return res.status(200).json({
            message: "usuario actualizado exitosamente"
        });

    } catch (error) {
        return res.status(500).json({
            mensaje: "no se pudo actualizar el usuario",
            error: error.message
        });
    }
}

const updateCompleto = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const datosActualizar = {
            nombre: req.body.nombre || null,
            email: req.body.email || null,
            password: req.body.password || null,
            updated_at: new Date()
        }

        const usuarioActualizado = await usuarioModel.findByIdAndUpdate(usuarioId, datosActualizar);

        if (!usuarioActualizado) {
            return res.status(404).json({
                message: "usuario no encontrado"
            });
        }

        return res.status(200).json({
            message: "usuario actualizado exitosamente"
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "no se pudo actualizar el usuario",
            error: error.message
        });
    }
}


// usuarios/:id
const deleteLogico = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const usuarioEliminado = await usuarioModel.findByIdAndUpdate(usuarioId, { deleted: true, deleted_at: new Date() });

        if (!usuarioEliminado) {
            return res.status(404).json({
                message: "usuario no encontrado"
            });
        }

        return res.status(200).json({
            message: "usuario eliminado exitosamente"
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "no se pudo eliminar el usuario",
            error: error.message
        });
    }
}

// usuarios/:id
const deleteFisico = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const usuarioEliminado = await usuarioModel.findByIdAndDelete(usuarioId);

        if (!usuarioEliminado) {
            return res.status(404).json({
                message: "usuario no encontrado"
            });
        }

        return res.status(200).json({
            message: "usuario eliminado exitosamente"
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "no se pudo eliminar el usuario",
            error: error.message
        });
    }
};

module.exports = {
    index,
    getById,
    create,
    delete: deleteLogico,
    updateParcial,
    updateCompleto
}