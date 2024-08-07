import React from "react";
import { useTranslation } from "react-i18next";

function RecordCard({ record }) {
  const { t } = useTranslation();

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-lg font-bold text-gray-dark">{t('recordCard.title', { patient: record.patient })}</h2>
      <p><strong>{t('recordCard.doctor')}:</strong> {record.doctor}</p>
      <p><strong>{t('recordCard.date')}:</strong> {new Date(record.date).toLocaleDateString()}</p>
      <div className="mt-2">
        <h3 className="text-md font-semibold text-gray">{t('recordCard.vitalSignsTitle')}:</h3>
        <p><strong>{t('recordCard.bloodPressure')}:</strong> {record.vitalSigns.bloodPressure.systolic}/{record.vitalSigns.bloodPressure.diastolic}</p>
        <p><strong>{t('recordCard.heartRate')}:</strong> {record.vitalSigns.heartRate}</p>
        <p><strong>{t('recordCard.oxygenSaturation')}:</strong> {record.vitalSigns.oxygenSaturation}</p>
        <p><strong>{t('recordCard.temperature')}:</strong> {record.vitalSigns.temperature}</p>
      </div>
      <div className="mt-2">
        <h3 className="text-md font-semibold text-gray">{t('recordCard.clinicalHistoryTitle')}:</h3>
        <p>{record.clinicalHistory}</p>
      </div>
    </div>
  );
}

export default RecordCard;
