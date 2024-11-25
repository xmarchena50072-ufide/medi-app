import React from "react";

export default function CardConsultationForm() {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-800 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center">
            <h6 className="text-blueGray-700 text-xl font-bold">Registrar Consulta</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            {/* Paciente */}
            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-300 text-xs font-bold mb-2">
                Paciente
              </label>
              <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                <option>Seleccione un paciente</option>
                <option>Paciente 1</option>
                <option>Paciente 2</option>
              </select>
            </div>

            {/* Doctor */}
            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-300 text-xs font-bold mb-2">
                Doctor
              </label>
              <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                <option>Seleccione un doctor</option>
                <option>Doctor 1</option>
                <option>Doctor 2</option>
              </select>
            </div>

            {/* Presión Arterial Sistólica */}
            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-300 text-xs font-bold mb-2">
                Presión Arterial Sistólica
              </label>
              <input
                type="text"
                placeholder="Sistólica"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>

            {/* Presión Arterial Diastólica */}
            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-300 text-xs font-bold mb-2">
                Presión Arterial Diastólica
              </label>
              <input
                type="text"
                placeholder="Diastólica"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>

            {/* Frecuencia Cardíaca */}
            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-300 text-xs font-bold mb-2">
                Frecuencia Cardíaca
              </label>
              <input
                type="text"
                placeholder="Frecuencia Cardíaca"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>

            {/* Saturación de Oxígeno */}
            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-300 text-xs font-bold mb-2">
                Saturación de Oxígeno
              </label>
              <input
                type="text"
                placeholder="Saturación de Oxígeno"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>

            {/* Temperatura */}
            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-300 text-xs font-bold mb-2">
                Temperatura
              </label>
              <input
                type="text"
                placeholder="Temperatura"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>

            {/* Motivo de Consulta */}
            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-300 text-xs font-bold mb-2">
                Motivo de Consulta
              </label>
              <textarea
                placeholder="Motivo de consulta"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                rows="4"
              ></textarea>
            </div>

            {/* Subir Archivos */}
            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-300 text-xs font-bold mb-2">
                Subir Archivos
              </label>
              <input
                type="file"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>

            {/* Botón Guardar */}
            <div className="text-center mt-6">
              <button
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
