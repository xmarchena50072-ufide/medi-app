import React, { useState, useEffect } from "react";
import { getAppointments, deleteAppointment } from "../../api/appointments";
import toast, { Toaster } from "react-hot-toast";

export default function CardAppointmentsTable() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (error) {
      toast.error("Error al obtener citas");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAppointment(id);
      setAppointments(appointments.filter((appointment) => appointment._id !== id));
    } catch (error) {
      toast.error("Error al eliminar la cita");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <h6 className="text-blueGray-700 text-xl font-bold">Citas Agendadas</h6>
      </div>

      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-blueGray-600 uppercase border-b border-blueGray-200">
                Título
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blueGray-600 uppercase border-b border-blueGray-200">
                Descripción
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blueGray-600 uppercase border-b border-blueGray-200">
                Fecha y Hora
              </th>
              <th className="px-6 py-3 text-right text-xs font-bold text-blueGray-600 uppercase border-b border-blueGray-200">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td className="px-6 py-4 border-b border-blueGray-200 text-sm">
                  {appointment.titulo}
                </td>
                <td className="px-6 py-4 border-b border-blueGray-200 text-sm">
                  {appointment.descripcion}
                </td>
                <td className="px-6 py-4 border-b border-blueGray-200 text-sm">
                  {appointment.fechaHora && new Date(appointment.fechaHora).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
