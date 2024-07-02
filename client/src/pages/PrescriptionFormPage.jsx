import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecords } from "../context/RecordsContext";
import { useNavigate, useParams } from "react-router-dom";

function PrescriptionFormPage() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { createPrescription, getPrescription, updatePrescription } = useRecords();
  const navigate = useNavigate();
  const params = useParams();

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

          <label htmlFor="medication" className="block text-white text-sm font-bold mb-2">Medication Name</label>
          <input
            type="text"
            placeholder="Medication"
            {...register("medication", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
          />
          {errors.medication && (<p className="text-red mb-2">Medication name is required</p>)}

          <label htmlFor="dose" className="block text-white text-sm font-bold mb-2">Dose</label>
          <input
            type="text"
            placeholder="Dose"
            {...register("dose", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
          />
          {errors.dose && (<p className="text-red mb-2">Dose is required</p>)}

          <label htmlFor="frequency" className="block text-white text-sm font-bold mb-2">Frequency</label>
          <input
            type="text"
            placeholder="Frequency"
            {...register("frequency", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
          />
          {errors.frequency && (<p className="text-red mb-2">Frequency is required</p>)}

          <label htmlFor="duration" className="block text-white text-sm font-bold mb-2">Duration</label>
          <input
            type="text"
            placeholder="Duration"
            {...register("duration", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
          />
          {errors.duration && (<p className="text-red mb-2">Duration is required</p>)}

          <label htmlFor="instructions" className="block text-white text-sm font-bold mb-2">Instructions</label>
          <textarea
            rows="3"
            placeholder="Instructions"
            {...register("instructions")}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
          ></textarea>

          <button className="bg-blue text-white px-4 py-2 rounded-md w-full mt-4">Save</button>
        </form>
      </div>
    </div>
  );
}

export default PrescriptionFormPage;
