import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";
import { getUserInfo } from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

// Ruta para registrar un usuario
router.post("/register", registerUser);

// Ruta para iniciar sesión
router.post("/login", loginUser);

router.get("/me", verifyToken, getUserInfo);

export default router;
