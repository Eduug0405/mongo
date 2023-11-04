const express = require('express');
const usuariosController = require('../controllers/usuarios.controller');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware.verificarJWT, usuariosController.index);
router.get('/:id', authMiddleware.verificarJWT, usuariosController.getById);
router.post('/', authMiddleware.verificarJWT, usuariosController.create);
router.delete('/:id', authMiddleware.verificarJWT, usuariosController.delete);
router.patch('/:id', authMiddleware.verificarJWT, usuariosController.updateParcial);
router.put('/:id', authMiddleware.verificarJWT, usuariosController.updateCompleto);

module.exports = router;