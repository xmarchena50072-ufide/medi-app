import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useTranslation } from "react-i18next";

dayjs.extend(utc);

function TaskFormPage() {
  const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm();
  const { createTask, getTask, updateTask, tasks } = useTasks();
  const navigate = useNavigate();
  const params = useParams();
  const { t } = useTranslation();
  const [disabledDates, setDisabledDates] = useState([]);
  const [isDateDisabled, setIsDateDisabled] = useState(false);

  // Watch for date changes
  const selectedDate = watch("date");

  useEffect(() => {
    // Load all task dates and set them as disabled dates
    const formattedTaskDates = tasks.map(task =>
      dayjs(task.date).utc().format("YYYY-MM-DDTHH:mm")
    );
    setDisabledDates(formattedTaskDates);
  }, [tasks]);

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", dayjs(task.date).utc().format("YYYY-MM-DDTHH:mm"));
      }
    }
    loadTask();
  }, [params.id, getTask, setValue]);

  // Check if selected date is disabled
  useEffect(() => {
    if (selectedDate) {
      const formattedDate = dayjs.utc(selectedDate).format("YYYY-MM-DDTHH:mm");
      setIsDateDisabled(disabledDates.includes(formattedDate));
    }
  }, [selectedDate, disabledDates]);

  const onSubmit = handleSubmit((data) => {
    if (isDateDisabled) {
      alert(t("taskFormPage.dateUnavailable"));
      return;
    }
    const dataValid = {
      ...data,
      date: dayjs.utc(data.date).format(), // Save date in UTC format
    };

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
          <label htmlFor="title" className="block text-white text-sm font-bold mb-2">
            {t('taskFormPage.titleLabel')}
          </label>
          <input
            type="text"
            placeholder={t('taskFormPage.titlePlaceholder')}
            {...register("title", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
            autoFocus
          />
          {errors.title && (<p className="text-red mb-2">{t('taskFormPage.titleRequired')}</p>)}

          <label htmlFor="description" className="block text-white text-sm font-bold mb-2">
            {t('taskFormPage.descriptionLabel')}
          </label>
          <textarea
            rows="3"
            placeholder={t('taskFormPage.descriptionPlaceholder')}
            {...register("description", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
          ></textarea>
          {errors.description && (<p className="text-red mb-2">{t('taskFormPage.descriptionRequired')}</p>)}

          <label htmlFor="date" className="block text-white text-sm font-bold mb-2">
            {t('taskFormPage.dateLabel')}
          </label>
          <input
            type="datetime-local"
            {...register("date", { required: true })}
            className={`w-full px-4 py-2 rounded-md mb-2 ${
              isDateDisabled ? 'bg-red-100 border-red-500' : 'bg-white text-gray-dark'
            }`}
          />
          {isDateDisabled && (
            <p className="text-red mb-2">{t('taskFormPage.dateUnavailable')}</p>
          )}
          {errors.date && !isDateDisabled && (<p className="text-red mb-2">{t('taskFormPage.dateRequired')}</p>)}

          <button className="bg-blue text-white px-4 py-2 rounded-md w-full mt-4" disabled={isDateDisabled}>
            {t('taskFormPage.saveButton')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskFormPage;
