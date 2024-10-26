import Task from "../models/task.model.js";
import { sendEmail } from "../email.js"; 

export const getTasks = async (req, res) => {
    const tasks = await Task.find({
        user: req.user.id
    }).populate("user");
    res.json(tasks);
};
export const createTask = async (req, res) => {
    const { title, description, date } = req.body;

    const newTask = new Task({
        title,
        description,
        date,
        user: req.user.id,
       
    });

    try {
        
        const savedTask = await newTask.save();
        console.log("Correo del usuario:", req.user.email);
        // Enviar correo de notificación
        const emailSubject = "Nueva Tarea Registrada";
        const emailBody = `Se ha registrado una nueva tarea:\n\nTítulo: ${title}\nDescripción: ${description}\nFecha: ${date}`;
        await sendEmail(req.user.email, emailSubject, emailBody); // Asegúrate de que `req.user.email` contenga el correo del usuario

        res.json(savedTask);
    } catch (error) {
        console.error("Error al crear la tarea:", error);
        res.status(500).json({ message: "Error al crear la tarea" });
    }
};
export const getTask = async (req, res) => {
    const task = await Task.findById(req.params.id).populate("user");

    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json(task);
};

export const deleteTask = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) return res.status(404).json({ message: 'Task not found' });
    return res.sendStatus(204);
    //res.json(task);
};

export const updateTask = async (req, res) => {
   // const subject = 'Tarea actualizada';
   // const body = `La tarea "${task.name}" ha sido actualizada.`;
    //await sendEmail(task.assignee.email, subject, body);
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
       
        new: true,
        
    });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json(task);
};