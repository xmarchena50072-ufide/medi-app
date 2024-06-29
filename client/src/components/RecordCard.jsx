import React from "react";

function RecordCard({ record }) {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-lg font-bold text-gray-dark">{record.patient}'s Medical Record</h2>
      <p><strong>Doctor:</strong> {record.doctor}</p>
      <p><strong>Date:</strong> {new Date(record.date).toLocaleDateString()}</p>
      <div className="mt-2">
        <h3 className="text-md font-semibold text-gray">Vital Signs:</h3>
        <p><strong>Blood Pressure:</strong> {record.vitalSigns.bloodPressure.systolic}/{record.vitalSigns.bloodPressure.diastolic}</p>
        <p><strong>Heart Rate:</strong> {record.vitalSigns.heartRate}</p>
        <p><strong>Oxygen Saturation:</strong> {record.vitalSigns.oxygenSaturation}</p>
        <p><strong>Temperature:</strong> {record.vitalSigns.temperature}</p>
      </div>
      <div className="mt-2">
        <h3 className="text-md font-semibold text-gray">Clinical History:</h3>
        <p>{record.clinicalHistory}</p>
      </div>
    </div>
  );
}

export default RecordCard;
