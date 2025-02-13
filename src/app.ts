import express from "express";
import cors from "cors";
import { json, urlencoded } from "express";
import dotenv from "dotenv";
import citasRoutes from "./routes/citas.routes";
import consultasRoutes from "./routes/consultas.routes";
import recipesRoutes from "./routes/recipes.routes";
import authRoutes from "./routes/auth.routes";
import medicalFormRoutes from "./routes/medicalForm.routes"


dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));


app.use("/api/citas", citasRoutes);
app.use("/api/consultas", consultasRoutes);
app.use("/api/recetas", recipesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/medical-forms", medicalFormRoutes);

// Rutas
export default app;
