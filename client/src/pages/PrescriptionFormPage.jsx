import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecords } from "../context/RecordsContext";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function PrescriptionFormPage() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { createPrescription, getPrescription, updatePrescription } = useRecords();
  const navigate = useNavigate();
  const params = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    async function loadPrescription() {
      if (params.id) {
        const prescription = await getPrescription(params.id);
        setValue("patient", prescription.patient);
        setValue("doctor", prescription.doctor);
        setValue("medication", prescription.medication);
        setValue("dose", prescription.dose);
        setValue("frequency", prescription.frequency);
        setValue("duration", prescription.duration);
        setValue("instructions", prescription.instructions);
      }
    }
    loadPrescription();
  }, [params.id, setValue, getPrescription]);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updatePrescription(params.id, data);
    } else {
      createPrescription(data);
    }
    navigate("/prescriptions");
  });

  return (
    <div className="flex h-auto items-center justify-center">
      <div className="bg-gray-dark max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <label htmlFor="patient" className="block text-white text-sm font-bold mb-2">
            {t('prescriptionFormPage.patient')}
          </label>
          <input
            type="text"
            placeholder={t('prescriptionFormPage.patientPlaceholder')}
            {...register("patient", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
            autoFocus
          />
          {errors.patient && (<p className="text-red mb-2">{t('prescriptionFormPage.patientRequired')}</p>)}

          <label htmlFor="doctor" className="block text-white text-sm font-bold mb-2">
            {t('prescriptionFormPage.doctor')}
          </label>
          <input
            type="text"
            placeholder={t('prescriptionFormPage.doctorPlaceholder')}
            {...register("doctor", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
          />
          {errors.doctor && (<p className="text-red mb-2">{t('prescriptionFormPage.doctorRequired')}</p>)}

          <label htmlFor="medication" className="block text-white text-sm font-bold mb-2">
            {t('prescriptionFormPage.medication')}
          </label>
          <input
            type="text"
            placeholder={t('prescriptionFormPage.medicationPlaceholder')}
            {...register("medication", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
          />
          {errors.medication && (<p className="text-red mb-2">{t('prescriptionFormPage.medicationRequired')}</p>)}

          <label htmlFor="dose" className="block text-white text-sm font-bold mb-2">
            {t('prescriptionFormPage.dose')}
          </label>
          <input
            type="text"
            placeholder={t('prescriptionFormPage.dosePlaceholder')}
            {...register("dose", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
          />
          {errors.dose && (<p className="text-red mb-2">{t('prescriptionFormPage.doseRequired')}</p>)}

          <label htmlFor="frequency" className="block text-white text-sm font-bold mb-2">
            {t('prescriptionFormPage.frequency')}
          </label>
          <input
            type="text"
            placeholder={t('prescriptionFormPage.frequencyPlaceholder')}
            {...register("frequency", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
          />
          {errors.frequency && (<p className="text-red mb-2">{t('prescriptionFormPage.frequencyRequired')}</p>)}

          <label htmlFor="duration" className="block text-white text-sm font-bold mb-2">
            {t('prescriptionFormPage.duration')}
          </label>
          <input
            type="text"
            placeholder={t('prescriptionFormPage.durationPlaceholder')}
            {...register("duration", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
          />
          {errors.duration && (<p className="text-red mb-2">{t('prescriptionFormPage.durationRequired')}</p>)}

          <label htmlFor="instructions" className="block text-white text-sm font-bold mb-2">
            {t('prescriptionFormPage.instructions')}
          </label>
          <textarea
            rows="3"
            placeholder={t('prescriptionFormPage.instructionsPlaceholder')}
            {...register("instructions")}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
          ></textarea>

          <button className="bg-blue text-white px-4 py-2 rounded-md w-full mt-4">
            {t('prescriptionFormPage.saveButton')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PrescriptionFormPage;
