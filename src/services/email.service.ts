import nodemailer from "nodemailer";

// Configuración del transporte con los datos del .env
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "email",
      pass: "pass",
    },
    logger: true, // Habilita los logs
    debug: true,  // Habilita la depuración
  });
  

// Función para enviar correos
export const sendEmail = async (to: string, subject: string, text: string, html?: string) => {
  try {
    const mailOptions = {
      from: "email",
      to,
      subject,
      text,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log("Correo enviado correctamente");
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw new Error("No se pudo enviar el correo");
  }
};