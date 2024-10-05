import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecords } from "../context/RecordsContext";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Importar i18n
 
function RecordFormPage() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { createRecord, getRecord, updateRecord } = useRecords();
  const navigate = useNavigate();
  const params = useParams();
  const { t } = useTranslation(); // Utilizar i18n para traducción
 
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
 
  useEffect(() => {
  
    setPatients([{ _id: "1", name: "Paciente 1" }, { _id: "2", name: "Paciente 2" }]);
    setDoctors([{ _id: "1", name: "Doctor 1" }, { _id: "2", name: "Doctor 2" }]);
 
    async function loadRecord() {
      if (params.id) {
        const record = await getRecord(params.id);
        setValue("patient", record.patient);
        setValue("doctor", record.doctor);
        setValue("vitalSigns.bloodPressure.systolic", record.vitalSigns.bloodPressure.systolic);
        setValue("vitalSigns.bloodPressure.diastolic", record.vitalSigns.bloodPressure.diastolic);
        setValue("vitalSigns.heartRate", record.vitalSigns.heartRate);
        setValue("vitalSigns.oxygenSaturation", record.vitalSigns.oxygenSaturation);
        setValue("vitalSigns.temperature", record.vitalSigns.temperature);
        setValue("clinicalHistory", record.clinicalHistory);
      }
    }
    loadRecord();
  }, [params.id, setValue, getRecord]);
 
  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    formData.append("patient", data.patient);
    formData.append("doctor", data.doctor);
    formData.append("vitalSigns[bloodPressure][systolic]", data.vitalSigns.bloodPressure.systolic);
    formData.append("vitalSigns[bloodPressure][diastolic]", data.vitalSigns.bloodPressure.diastolic);
    formData.append("vitalSigns[heartRate]", data.vitalSigns.heartRate);
    formData.append("vitalSigns[oxygenSaturation]", data.vitalSigns.oxygenSaturation);
    formData.append("vitalSigns[temperature]", data.vitalSigns.temperature);
    formData.append("clinicalHistory", data.clinicalHistory);
    for (const file of data.files) {
      formData.append("files", file);
    }
 
    if (params.id) {
      updateRecord(params.id, formData);
    } else {
      createRecord(formData);
    }
    navigate("/records");
  });
 
  return (
    <div className="flex h-auto items-center justify-center">
      <div className="bg-gray-dark max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit} encType="multipart/form-data">
 
          <label htmlFor="patient" className="block text-white text-sm font-bold mb-2">
            {t('recordFormPage.patient')}
          </label>
          <select
            {...register("patient", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
          >
            <option value="">{t('Seleccione un paciente')}</option>
            {patients.map((patient) => (
              <option key={patient._id} value={patient._id}>
                {patient.name}
              </option>
            ))}
          </select>
          {errors.patient && (<p className="text-red mb-2">{t('recordFormPage.patientRequired')}</p>)}
 
          <label htmlFor="doctor" className="block text-white text-sm font-bold mb-2">
            {t('recordFormPage.doctor')}
          </label>
          <select
            {...register("doctor", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
          >
            <option value="">{t('Seleccione un doctor')}</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.name}
              </option>
            ))}
          </select>
          {errors.doctor && (<p className="text-red mb-2">{t('recordFormPage.doctorRequired')}</p>)}
 
        
          <label htmlFor="bloodPressureSystolic" className="block text-white text-sm font-bold mb-2">
            {t('recordFormPage.bloodPressureSystolic')}
          </label>
          <input
            type="number"
            placeholder={t('recordFormPage.bloodPressureSystolicPlaceholder')}
            {...register("vitalSigns.bloodPressure.systolic", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
          />
          {errors.vitalSigns?.bloodPressure?.systolic && (<p className="text-red mb-2">{t('recordFormPage.bloodPressureSystolicRequired')}</p>)}
 
          <label htmlFor="bloodPressureDiastolic" className="block text-white text-sm font-bold mb-2">
            {t('recordFormPage.bloodPressureDiastolic')}
          </label>
          <input
            type="number"
            placeholder={t('recordFormPage.bloodPressureDiastolicPlaceholder')}
            {...register("vitalSigns.bloodPressure.diastolic", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
          />
          {errors.vitalSigns?.bloodPressure?.diastolic && (<p className="text-red mb-2">{t('recordFormPage.bloodPressureDiastolicRequired')}</p>)}
 
 
          <label htmlFor="heartRate" className="block text-white text-sm font-bold mb-2">
            {t('recordFormPage.heartRate')}
          </label>
          <input
            type="number"
            placeholder={t('recordFormPage.heartRatePlaceholder')}
            {...register("vitalSigns.heartRate", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
          />
          {errors.vitalSigns?.heartRate && (<p className="text-red mb-2">{t('recordFormPage.heartRateRequired')}</p>)}
 
          <label htmlFor="oxygenSaturation" className="block text-white text-sm font-bold mb-2">
            {t('recordFormPage.oxygenSaturation')}
          </label>
          <input
            type="number"
            placeholder={t('recordFormPage.oxygenSaturationPlaceholder')}
            {...register("vitalSigns.oxygenSaturation", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
          />
          {errors.vitalSigns?.oxygenSaturation && (<p className="text-red mb-2">{t('recordFormPage.oxygenSaturationRequired')}</p>)}
 
          <label htmlFor="temperature" className="block text-white text-sm font-bold mb-2">
            {t('recordFormPage.temperature')}
          </label>
          <input
            type="number"
            placeholder={t('recordFormPage.temperaturePlaceholder')}
            {...register("vitalSigns.temperature", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
          />
          {errors.vitalSigns?.temperature && (<p className="text-red mb-2">{t('recordFormPage.temperatureRequired')}</p>)}
 
          <label htmlFor="clinicalHistory" className="block text-white text-sm font-bold mb-2">
            {t('recordFormPage.clinicalHistory')}
          </label>
          <textarea
            rows="3"
            placeholder={t('recordFormPage.clinicalHistoryPlaceholder')}
            {...register("clinicalHistory", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
          ></textarea>
          {errors.clinicalHistory && (<p className="text-red mb-2">{t('recordFormPage.clinicalHistoryRequired')}</p>)}
 
          <label htmlFor="files" className="block text-white text-sm font-bold mb-2">
            {t('recordFormPage.files')}
          </label>
          <input
            type="file"
            {...register("files", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
            multiple
          />
          {errors.files && (<p className="text-red mb-2">{t('recordFormPage.filesRequired')}</p>)}
 
          <button className="bg-blue text-white px-4 py-2 rounded-md w-full mt-4">
            {t('recordFormPage.saveButton')}
          </button>
        </form>
      </div>
    </div>
  );
}
 
export default RecordFormPage;