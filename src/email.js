import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  host: 'mail.transportgasa.com',
  port: 25,
  secure: false, // or 'STARTTLS'
  auth: {
    user: 'sistemas@transportgasa.com',
    pass: 'GASA.2020'
  }
});

export async function sendEmail(to, subject, body) {
   
  const mailOptions = {
    from: 'sistemas@transportgasa.com',
    to : 'sistemas@transportgasa.com',
    subject: subject,
    text: body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado con éxito');
  } catch (error) {
    console.error('Error al enviar correo electrónico:', error);
  }
}