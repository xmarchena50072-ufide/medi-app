import React, { useState } from "react";
import { createMedicalRecipe } from "../../api/recipes";

export default function CardMedicalRecipe() {
  const [form, setForm] = useState({
    paciente: "",
    fecha: "",
    medicamentos: "",
    correo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMedicalRecipe(form);
      alert("Receta médica creada exitosamente");
      setForm({ paciente: "", fecha: "", medicamentos: "", correo: "" }); // Reiniciar formulario
    } catch (error) {
      alert("Error al crear la receta médica");
    }
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      {/* Encabezado */}
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <div className="text-center flex justify-between">
          <h6 className="text-blueGray-700 text-xl font-bold">Agregar Receta Médica</h6>
          <button
            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="button"
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
            Información de la Receta
          </h6>
          <div className="flex flex-wrap">
            {/* Nombre del Paciente */}
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Nombre del Paciente
                </label>
                <input
                  type="text"
                  name="paciente"
                  value={form.paciente}
                  onChange={handleChange}
                  placeholder="Nombre del Paciente"
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

            {/* Medicamentos */}
            <div className="w-full px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Medicamentos
                </label>
                <textarea
                  name="medicamentos"
                  value={form.medicamentos}
                  onChange={handleChange}
                  placeholder="Escriba los medicamentos y las indicaciones"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  rows="4"
                  required
                ></textarea>
              </div>
            </div>

            {/* Correo del Paciente */}
            <div className="w-full px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Correo del Paciente
                </label>
                <input
                  type="email"
                  name="correo"
                  value={form.correo}
                  onChange={handleChange}
                  placeholder="Correo Electrónico"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  required
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
