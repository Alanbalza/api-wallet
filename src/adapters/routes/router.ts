import { Router } from 'express';
import { crearUsuario, obtenerUsuarios, obtenerUsuarioPorId, actualizarUsuario, eliminarUsuario, loginUsuario} from '../controllers/usuarioController';
import { crearCartera, obtenerCarteras, obtenerCarteraPorId, actualizarCartera, eliminarCartera } from '../controllers/carteraController';
import { crearGasto, obtenerGastos, obtenerGastoPorId, actualizarGasto, eliminarGasto } from '../controllers/gastoController';
import { validarUsuario } from '../middlewares/validarUsuario';
import { validarCartera } from '../middlewares/validarCartera';
import { validarGasto } from '../middlewares/validarGasto';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/usuarios', validarUsuario, crearUsuario);
router.get('/usuarios', authMiddleware, obtenerUsuarios);
router.get('/usuarios/:id', authMiddleware, obtenerUsuarioPorId);
router.put('/usuarios/:id', authMiddleware, validarUsuario, actualizarUsuario);
router.delete('/usuarios/:id', authMiddleware, eliminarUsuario);
router.post('/usuarios/login', loginUsuario);


router.post('/carteras', validarCartera, crearCartera);
router.get('/carteras', authMiddleware, obtenerCarteras);
router.get('/carteras/:id', authMiddleware, obtenerCarteraPorId);
router.put('/carteras/:id', authMiddleware, validarCartera, actualizarCartera);
router.delete('/carteras/:id', authMiddleware, eliminarCartera);
//router.post('/carteras/login', loginUsuario);

router.post('/gastos', validarGasto, crearGasto);
router.get('/gastos', authMiddleware, obtenerGastos);
router.get('/gastos/:id', authMiddleware, obtenerGastoPorId);
router.put('/gastos/:id', authMiddleware, validarGasto, actualizarGasto);
router.delete('/gastos/:id', authMiddleware, eliminarGasto);
//router.post('/carteras/login', loginUsuario);

export default router;
