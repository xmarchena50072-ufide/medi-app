import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecords } from "../context/RecordsContext";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

function RecordFormPage() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { createRecord, getRecord, updateRecord } = useRecords();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
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
  }, []);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateRecord(params.id, data);
    } else {
      createRecord(data);
    }
    navigate("/records");
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-gray-dark max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <label htmlFor="patient" className="block text-white text-sm font-bold mb-2">Patient</label>
          <input
            type="text"
            placeholder="Patient"
            {...register("patient", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
            autoFocus
          />
          {errors.patient && (<p className="text-red mb-2">Patient is required</p>)}

          <label htmlFor="doctor" className="block text-white text-sm font-bold mb-2">Doctor</label>
          <input
            type="text"
            placeholder="Doctor"
            {...register("doctor", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
          />
          {errors.doctor && (<p className="text-red mb-2">Doctor is required</p>)}

          <label htmlFor="bloodPressureSystolic" className="block text-white text-sm font-bold mb-2">Blood Pressure Systolic</label>
          <input
            type="number"
            placeholder="Systolic"
            {...register("vitalSigns.bloodPressure.systolic", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
          />
          {errors.vitalSigns?.bloodPressure?.systolic && (<p className="text-red mb-2">Systolic is required</p>)}

          <label htmlFor="bloodPressureDiastolic" className="block text-white text-sm font-bold mb-2">Blood Pressure Diastolic</label>
          <input
            type="number"
            placeholder="Diastolic"
            {...register("vitalSigns.bloodPressure.diastolic", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
          />
          {errors.vitalSigns?.bloodPressure?.diastolic && (<p className="text-red mb-2">Diastolic is required</p>)}

          <label htmlFor="heartRate" className="block text-white text-sm font-bold mb-2">Heart Rate</label>
          <input
            type="number"
            placeholder="Heart Rate"
            {...register("vitalSigns.heartRate", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
          />
          {errors.vitalSigns?.heartRate && (<p className="text-red mb-2">Heart Rate is required</p>)}

          <label htmlFor="oxygenSaturation" className="block text-white text-sm font-bold mb-2">Oxygen Saturation</label>
          <input
            type="number"
            placeholder="Oxygen Saturation"
            {...register("vitalSigns.oxygenSaturation", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
          />
          {errors.vitalSigns?.oxygenSaturation && (<p className="text-red mb-2">Oxygen Saturation is required</p>)}

          <label htmlFor="temperature" className="block text-white text-sm font-bold mb-2">Temperature</label>
          <input
            type="number"
            placeholder="Temperature"
            {...register("vitalSigns.temperature", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
          />
          {errors.vitalSigns?.temperature && (<p className="text-red mb-2">Temperature is required</p>)}

          <label htmlFor="clinicalHistory" className="block text-white text-sm font-bold mb-2">Clinical History</label>
          <textarea
            rows="3"
            placeholder="Clinical History"
            {...register("clinicalHistory", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
          ></textarea>
          {errors.clinicalHistory && (<p className="text-red mb-2">Clinical History is required</p>)}

          <button className="bg-blue text-white px-4 py-2 rounded-md w-full mt-4">Save</button>
        </form>
      </div>
    </div>
  );
}

export default RecordFormPage;
