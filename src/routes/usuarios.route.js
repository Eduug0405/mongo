const express = require('express');
const usuariosController = require('../controllers/usuarios.controller');
const router = express.Router();

router.get('/', usuariosController.index);
router.get('/:id', usuariosController.getById);
router.post('/', usuariosController.create);
router.delete('/:id', usuariosController.delete);
router.patch('/:id', usuariosController.updateParcial);
router.put('/:id', usuariosController.updateCompleto);

module.exports = router;