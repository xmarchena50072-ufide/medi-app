import React from "react";

export default function CardConsultationsTable() {
  const consultations = [
    {
      id: 1,
      patient: "Juan Pérez",
      doctor: "Dr. Ana López",
      systolic: "120",
      diastolic: "80",
      heartRate: "72",
      oxygenSaturation: "98%",
      temperature: "36.5°C",
      reason: "Revisión general",
      date: "2024-12-01",
    },
    {
      id: 2,
      patient: "María González",
      doctor: "Dr. Carlos Ruiz",
      systolic: "140",
      diastolic: "90",
      heartRate: "75",
      oxygenSaturation: "97%",
      temperature: "37.0°C",
      reason: "Dolor abdominal",
      date: "2024-12-05",
    },
    {
      id: 3,
      patient: "Luis Fernández",
      doctor: "Dr. Ana López",
      systolic: "110",
      diastolic: "70",
      heartRate: "68",
      oxygenSaturation: "99%",
      temperature: "36.8°C",
      reason: "Chequeo postoperatorio",
      date: "2024-12-10",
    },
  ];

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        {/* Encabezado */}
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              Consultas Registradas
            </h6>
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
                <tr key={consultation.id} className="hover:bg-blueGray-100">
                  <td className="px-6 py-4 border-b border-blueGray-200 text-sm">
                    {consultation.patient}
                  </td>
                  <td className="px-6 py-4 border-b border-blueGray-200 text-sm">
                    {consultation.doctor}
                  </td>
                  <td className="px-6 py-4 border-b border-blueGray-200 text-sm">
                    {consultation.date}
                  </td>
                  <td className="px-6 py-4 border-b border-blueGray-200 text-sm">
                    {consultation.reason}
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
    </>
  );
}
