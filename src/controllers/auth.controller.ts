import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password, role } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "El correo ya está en uso" });
            return;
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role,
        });

        await newUser.save();

        // Crear un token de autenticación
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET || "secret", {
            expiresIn: "1d",
        });

        res.status(201).json({
            message: "Usuario registrado exitosamente",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
            },
            token,
        });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Contraseña incorrecta" });
            return;
        }

        // Generar el token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret", {
            expiresIn: "1d",
        });

        res.status(200).json({
            message: "Inicio de sesión exitoso",
            user: { id: user._id, username: user.username, email: user.email, role: user.role },
            token,
        });
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
};

export const getUserInfo = async (req: Request, res: Response): Promise<void> => {
    try {

        const userId = (req as Request & { userId: string }).userId;
        console.log("ID del usuario recibido:", userId); // Verifica si el ID del usuario llega correctamente

        if (!userId) {
            res.status(400).json({ message: "Usuario no autenticado" });
            return;
        }

        const user = await User.findById(userId, "-password"); // Excluir contraseña
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }

        res.status(200).json({
            message: "Información del usuario obtenida correctamente",
            user,
        });
    } catch (error) {
        console.error("Error al obtener información del usuario:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
};



