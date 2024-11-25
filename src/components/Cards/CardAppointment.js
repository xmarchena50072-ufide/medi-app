import React from "react";

export default function CardAppointment() {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-800 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center">
            <h6 className="text-blueGray-700 text-xl font-bold">Agregar Cita</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            {/* Título */}
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-300 text-xs font-bold mb-2"
                htmlFor="appointment-title"
              >
                Título
              </label>
              <input
                type="text"
                id="appointment-title"
                placeholder="Título"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>

            {/* Descripción */}
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-300 text-xs font-bold mb-2"
                htmlFor="appointment-description"
              >
                Descripción
              </label>
              <textarea
                id="appointment-description"
                placeholder="Descripción"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                rows="4"
              ></textarea>
            </div>

            {/* Fecha */}
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-300 text-xs font-bold mb-2"
                htmlFor="appointment-date"
              >
                Fecha y Hora
              </label>
              <input
                type="datetime-local"
                id="appointment-date"
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