import React, { useState, useEffect } from "react";
import { getConsultations, deleteConsultation } from "../../api/consultations";
import toast, { Toaster } from "react-hot-toast";

export default function CardConsultationsTable() {
  const [consultations, setConsultations] = useState([]);

  // Función para obtener consultas desde la API
  const fetchConsultations = async () => {
    try {
      const data = await getConsultations();
      setConsultations(data);
    } catch (error) {
      toast.error("Error al obtener consultas");
    }
  };

  // Función para eliminar una consulta
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta consulta?")) {
      try {
        await deleteConsultation(id);
        setConsultations(consultations.filter((consultation) => consultation._id !== id));
        toast.success("Consulta eliminada exitosamente");
      } catch (error) {
        toast.error("Error al eliminar la consulta");
      }
    }
  };

  // Obtener consultas al montar el componente
  useEffect(() => {
    fetchConsultations();
  }, []);

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      {/* Encabezado */}
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <div className="text-center flex justify-between">
          <h6 className="text-blueGray-700 text-xl font-bold">Consultas Registradas</h6>
        </div>
      </div>

      {/* Tabla */}
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-blueGray-600 uppercase border-b border-blueGray-200">
                Paciente
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blueGray-600 uppercase border-b border-blueGray-200">
                Doctor
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blueGray-600 uppercase border-b border-blueGray-200">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blueGray-600 uppercase border-b border-blueGray-200">
                Motivo
              </th>
              <th className="px-6 py-3 text-right text-xs font-bold text-blueGray-600 uppercase border-b border-blueGray-200">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {consultations.map((consultation) => (
              <tr key={consultation._id} className="hover:bg-blueGray-100">
                <td className="px-6 py-4 border-b border-blueGray-200 text-sm">
                  {consultation.paciente}
                </td>
                <td className="px-6 py-4 border-b border-blueGray-200 text-sm">
                  {consultation.doctor}
                </td>
                <td className="px-6 py-4 border-b border-blueGray-200 text-sm">
                {consultation.fecha.slice(0, 10)}
                </td>
                <td className="px-6 py-4 border-b border-blueGray-200 text-sm">
                  {consultation.motivo}
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
