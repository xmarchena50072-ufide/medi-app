import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc)

function TaskFormPage() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", dayjs(task.date).utc().format("YYYY-MM-DDTHH:MM"));
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit((data) => {
    const dataValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    };

    dataValid.date = dayjs.utc(data.date).format();

    if (params.id) {
      updateTask(params.id, dataValid);
    } else {
      createTask(dataValid);
    }
    navigate("/tasks");
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-gray-dark max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <label htmlFor="title" className="block text-white text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            placeholder="Title"
            {...register("title", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
            autoFocus
          />
          {errors.title && (<p className="text-red mb-2">Title is required</p>)}

          <label htmlFor="description" className="block text-white text-sm font-bold mb-2">Description</label>
          <textarea
            rows="3"
            placeholder="Description"
            {...register("description", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
          ></textarea>
          {errors.description && (<p className="text-red mb-2">Description is required</p>)}

          <label htmlFor="date" className="block text-white text-sm font-bold mb-2">Date</label>
          <input
            type="datetime-local"
            {...register("date", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
          />
          {errors.date && (<p className="text-red mb-2">Date is required</p>)}

          <button className="bg-blue text-white px-4 py-2 rounded-md w-full mt-4">Save</button>
        </form>
      </div>
    </div>
  );
}

export default TaskFormPage;
