import React, { useState } from "react";
import { createConsultation } from "../../api/consultations";

export default function CardConsultationForm() {
  const [form, setForm] = useState({
    paciente: "",
    sistolica: "",
    diastolica: "",
    frecuenciaCardiaca: "",
    saturacionOxigeno: "",
    temperatura: "",
    motivo: "",
    fecha: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Agregamos el doctor fijo en el envío
      await createConsultation({ ...form, doctor: "Marlon Jimenez" });
      alert("Consulta registrada exitosamente");

      // Reinicia el formulario
      setForm({
        paciente: "",
        sistolica: "",
        diastolica: "",
        frecuenciaCardiaca: "",
        saturacionOxigeno: "",
        temperatura: "",
        motivo: "",
        fecha: "",
      });
    } catch (error) {
      alert("Error al registrar la consulta");
    }
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      {/* Encabezado */}
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <div className="text-center flex justify-between">
          <h6 className="text-blueGray-700 text-xl font-bold">Registrar Consulta</h6>
          <button
            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="submit"
            onClick={handleSubmit}
          >
            Guardar
          </button>
        </div>
      </div>

      {/* Formulario */}
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <form onSubmit={handleSubmit}>
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Información del Paciente
          </h6>
          <div className="flex flex-wrap">
            {/* Paciente */}
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Paciente
                </label>
                <input
                  type="text"
                  name="paciente"
                  value={form.paciente}
                  onChange={handleChange}
                  placeholder="Nombre del paciente"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  required
                />
              </div>
            </div>

            {/* Fecha */}
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Fecha
                </label>
                <input
                  type="date"
                  name="fecha"
                  value={form.fecha}
                  onChange={handleChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  required
                />
              </div>
            </div>
          </div>

          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Signos Vitales
          </h6>
          <div className="flex flex-wrap">
            {/* Signos vitales */}
            {[
              { label: "Sistólica", name: "sistolica", placeholder: "Sistólica (mmHg)" },
              { label: "Diastólica", name: "diastolica", placeholder: "Diastólica (mmHg)" },
              { label: "Frecuencia Cardíaca", name: "frecuenciaCardiaca", placeholder: "Latidos por minuto" },
              { label: "Temperatura", name: "temperatura", placeholder: "Temperatura (°C)" },
              { label: "Saturación de Oxígeno", name: "saturacionOxigeno", placeholder: "Saturación (%)" },
            ].map((item, index) => (
              <div key={index} className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    {item.label}
                  </label>
                  <input
                    type="number"
                    name={item.name}
                    value={form[item.name]}
                    onChange={handleChange}
                    placeholder={item.placeholder}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Detalles Adicionales
          </h6>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-12/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Motivo de Consulta
                </label>
                <textarea
                  name="motivo"
                  value={form.motivo}
                  onChange={handleChange}
                  placeholder="Motivo de consulta"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  rows="4"
                  required
                ></textarea>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
