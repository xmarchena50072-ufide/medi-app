import React from "react";
import { FaStethoscope, FaSyringe, FaFlask } from "react-icons/fa";
import imageIcon from "../assets/med.jpg";

function HomePage() {
  const services = [
    {
      title: "Consulta General",
      description: "Brindamos atención médica de alta calidad para todas las edades.",
      icon: <FaStethoscope className="text-blue-600 text-4xl mb-4" />,
    },
    {
      title: "Exámenes Médicos",
      description: "Realizamos análisis clínicos para garantizar tu bienestar.",
      icon: <FaFlask className="text-blue-600 text-4xl mb-4" />,
    },
    {
      title: "Vacunación",
      description: "Protege a tu familia con nuestras vacunas confiables.",
      icon: <FaSyringe className="text-blue-600 text-4xl mb-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* Hero Section */}
      <section className="flex-1 container mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
        <div className="text-center md:text-left md:w-1/2">
          <h2 className="text-4xl font-bold text-blue-800">
            Bienvenidos al Consultorio Médico
          </h2>
          <p className="text-gray-700 mt-4">
            Nos preocupamos por tu salud. Nuestro equipo de expertos está aquí
            para ayudarte a mantenerte en tu mejor estado.
          </p>
        </div>
        <div className="mt-8 md:mt-0 md:w-1/2">
          <img
            src={imageIcon}
            alt="Consultorio Médico"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center text-blue-800 mb-8">
          Nuestros Servicios
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg shadow-md p-6 flex flex-col items-center text-center"
            >
              {service.icon}
              <h4 className="text-xl font-bold text-gray-800">{service.title}</h4>
              <p className="text-gray-600 mt-2">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-blue-600 py-4">
        <div className="container mx-auto text-center text-black">
          <p>&copy; {new Date().getFullYear()} Consultorio Médico. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
