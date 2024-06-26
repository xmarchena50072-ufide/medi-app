import { useEffect, useState } from "react";
import dayjs from "dayjs";
import isoWeek from 'dayjs/plugin/isoWeek';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { useTasks } from "../context/TasksContext";

dayjs.extend(isoWeek);
dayjs.extend(advancedFormat);

function CalendarPage() {
    const { getTasks, tasks } = useTasks();
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [calendar, setCalendar] = useState([]);

    useEffect(() => {
        getTasks();
    }, []);

    useEffect(() => {
        generateCalendar(currentDate);
    }, [tasks, currentDate]);

    const generateCalendar = (date) => {
        const startMonth = date.startOf('month');
        const endMonth = date.endOf('month');
        const startDate = startMonth.startOf('isoWeek');
        const endDate = endMonth.endOf('isoWeek');

        const calendarDays = [];
        let day = startDate;

        while (day.isBefore(endDate) || day.isSame(endDate, 'day')) {
            calendarDays.push({
                date: day,
                tasks: tasks.filter(task => dayjs(task.date).isSame(day, 'day'))
            });
            day = day.add(1, 'day');
        }
        setCalendar(calendarDays);
    };

    const nextMonth = () => {
        setCurrentDate(currentDate.add(1, 'month'));
    };

    const prevMonth = () => {
        setCurrentDate(currentDate.subtract(1, 'month'));
    };

    const nextYear = () => {
        setCurrentDate(currentDate.add(1, 'year'));
    };

    const prevYear = () => {
        setCurrentDate(currentDate.subtract(1, 'year'));
    };

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const today = dayjs();

    return (
        <div className="p-6 bg-gray-dark min-h-screen flex flex-col items-center">
            <div className="flex justify-between items-center mb-4 w-full max-w-4xl">
                <div>
                    <button onClick={prevYear} className="px-4 py-2 bg-gray text-white rounded-md mr-2 hover:bg-gray-light transition">Prev Year</button>
                    <button onClick={prevMonth} className="px-4 py-2 bg-gray text-white rounded-md hover:bg-gray-light transition">Prev Month</button>
                </div>
                <h1 className="text-3xl text-white font-bold">{currentDate.format("MMMM YYYY")}</h1>
                <div>
                    <button onClick={nextMonth} className="px-4 py-2 bg-gray text-white rounded-md hover:bg-gray-light transition">Next Month</button>
                    <button onClick={nextYear} className="px-4 py-2 bg-gray text-white rounded-md ml-2 hover:bg-gray-light transition">Next Year</button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-2 w-full max-w-4xl">
                {daysOfWeek.map((day, index) => (
                    <div key={index} className="text-center font-bold text-white">
                        {day}
                    </div>
                ))}
                {calendar.map((calendarDay, index) => (
                    <div key={index} className={`border p-2 rounded-md ${calendarDay.date.isSame(currentDate, 'month') ? "bg-gray" : "bg-gray-light"} ${calendarDay.date.isSame(today, 'day') ? "bg-green border-gray-dark" : "border-gray-dark"}`}>
                        <div className="text-center font-bold text-white">{calendarDay.date.format("D")}</div>
                        {calendarDay.tasks.map(task => (
                            <div key={task._id} className="mt-2 p-2 bg-gray-dark rounded-md">
                                <div className="text-sm font-semibold text-white">{task.title}</div>
                                <div className="text-xs text-gray-light">{dayjs(task.date).format('h:mm A')} - {task.description}</div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CalendarPage;
