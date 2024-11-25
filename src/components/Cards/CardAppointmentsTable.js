import React from "react";

export default function CardAppointmentsTable() {
  const appointments = [
    { id: 1, title: "Consulta General", description: "Revisión anual", date: "2024-11-30 10:00" },
    { id: 2, title: "Consulta Pediátrica", description: "Control de niño sano", date: "2024-12-01 14:30" },
    { id: 3, title: "Chequeo Dental", description: "Limpieza dental", date: "2024-12-02 16:00" },
  ];

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-blueGray-100">
        <div className="relative flex flex-col min-w-0 break-words w-full md:w-3/4 lg:w-2/3 mb-6 shadow-lg rounded-lg bg-white border-0">
          <div className="rounded-t bg-blueGray-800 mb-0 px-6 py-6">
            <div className="text-center">
              <h6 className="text-white text-xl font-bold">Citas Agendadas</h6>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <table className="min-w-full bg-white">
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
                  <tr key={appointment.id}>
                    <td className="px-6 py-4 border-b border-blueGray-200 text-sm">
                      {appointment.title}
                    </td>
                    <td className="px-6 py-4 border-b border-blueGray-200 text-sm">
                      {appointment.description}
                    </td>
                    <td className="px-6 py-4 border-b border-blueGray-200 text-sm">
                      {appointment.date}
                    </td>
                    <td className="px-6 py-4 border-b border-blueGray-200 text-sm text-right">
                      <button className="bg-red-500 text-white text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
