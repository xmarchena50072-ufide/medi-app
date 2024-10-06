export const validateSchema = (schema) => (req, res, next) => {
    try {
        // Registrar los datos recibidos en el body para depuración
        console.log("Received data:", req.body);

        // Validar el esquema utilizando la librería 'zod' o la que estés usando
        schema.parse(req.body);

        // Si la validación es exitosa, continuar con el siguiente middleware
        next();
    } catch (error) {
        // Capturar el error y extraer información detallada para depuración

        // Crear un arreglo de errores más descriptivos
        const detailedErrors = error.errors.map((err) => ({
            field: err.path, // Nombre del campo que falló la validación
            message: err.message, // Mensaje de error
            value: req.body[err.path] || "No value provided" // Valor enviado (si existe)
        }));

        // Registrar el detalle de los errores en la consola para depuración
        console.error("Validation errors:", detailedErrors);

        // Enviar una respuesta con los errores detallados
        return res.status(400).json({
            message: "Validation failed",
            errors: detailedErrors,
        });
    }
};
