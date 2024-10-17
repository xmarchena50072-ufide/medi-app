import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"; // Add Link for navigation
import { useRecords } from '../context/RecordsContext'; // Assuming you have a similar context for records
 
function RecordCard({ record }) {
  const { t } = useTranslation();
  const { deleteRecord } = useRecords(); // Get deleteRecord function from context
 
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <header className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-dark">
          {t('recordCard.title', { patient: record.patient })}
        </h2>
        <div className="flex gap-x-2 items-center">
          {/* Delete Button */}
          <button
            className="bg-red text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            onClick={() => {
              deleteRecord(record._id); // Delete record when clicked
            }}
          >
            {t('recordCard.delete')}
          </button>
 
          {/* Edit Button */}
          <Link
            to={`/records/${record._id}`}
            className="bg-blue text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            {t('recordCard.edit')}
          </Link>
        </div>
      </header>
 
      <p><strong>{t('recordCard.doctor')}:</strong> {record.doctor}</p>
      <p><strong>{t('recordCard.date')}:</strong> {new Date(record.date).toLocaleDateString()}</p>
     
      <div className="mt-2">
        <h3 className="text-md font-semibold text-gray">
          {t('recordCard.vitalSignsTitle')}:
        </h3>
        <p><strong>{t('recordCard.bloodPressure')}:</strong> {record.vitalSigns.bloodPressure.systolic}/{record.vitalSigns.bloodPressure.diastolic}</p>
        <p><strong>{t('recordCard.heartRate')}:</strong> {record.vitalSigns.heartRate}</p>
        <p><strong>{t('recordCard.oxygenSaturation')}:</strong> {record.vitalSigns.oxygenSaturation}</p>
        <p><strong>{t('recordCard.temperature')}:</strong> {record.vitalSigns.temperature}</p>
      </div>
 
      <div className="mt-2">
        <h3 className="text-md font-semibold text-gray">
          {t('recordCard.clinicalHistoryTitle')}:
        </h3>
        <p>{record.clinicalHistory}</p>
      </div>
    </div>
  );
}
 
export default RecordCard;
 