import { createTask } from "./addTask.js";
import dateElement from "./dateElement.js";
import { uniqueDates, orderDates } from "../services/date.js";

export const readTasks = () => {
    const taskList = JSON.parse (localStorage.getItem("tasks")) || [];

    const list = document.querySelector('[data-list]');
    const dates = uniqueDates(taskList);
    orderDates(dates);
    
    dates.forEach((date)=> {
        const dateMoment = moment (date, "DD/MM/YYYY");
        
        list.appendChild(dateElement(date));
        taskList.forEach((task) => {
            const taskMoment = moment(task.dateFormat, "DD/MM/YYYY");
            const diff = dateMoment.diff(taskMoment);
            if (diff === 0) {
                list.appendChild(createTask(task));
            };
        });
    });

    
};