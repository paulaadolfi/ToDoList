import checkComplete from './checkComplete.js';
import deleteIcon from './deleteIcon.js';
import { readTasks } from './readTask.js';


export const addTask = (evento) => {
    evento.preventDefault();
    
    const input = document.querySelector('[data-form-input]');
    const list = document.querySelector('[data-list]');
    const calendar = document.querySelector("[data-form-date]");

    const value = input.value;
    const date = calendar.value;
    const dateFormat = moment(date).format("DD/MM/YYYY");
    
    if (value === "" || date === "") {
        return;
    };
    
    input.value = '';
    calendar.value = "";

    const complete = false;
    
    const taskObj = {
        value,
        dateFormat,
        complete, 
        id: uuid.v4(),
      };
    
    list.innerHTML = "";
    
    const taskList = JSON.parse (localStorage.getItem("tasks")) || [];
    taskList.push({value, dateFormat});
  
    localStorage.setItem("tasks", JSON.stringify(taskList));

      readTasks();
  };
  
  export const createTask = ({value, dateFormat, complete, id}) => {
   
    const task = document.createElement('li');
        task.classList.add('card');
    
    const taskContent = document.createElement('div');
    const taskContentDate = document.createElement('div');
    const check = checkComplete(id);
    
    if (complete) {
        check.classList.toggle('fas');
        check.classList.toggle('completeIcon');
        check.classList.toggle('far');
    };
    
    const titleTask = document.createElement('span');
        titleTask.classList.add('task');
        titleTask.innerText = value;
        taskContent.appendChild(checkComplete(id));
        taskContent.appendChild(titleTask);
  
    const dateElement = document.createElement("span");
        dateElement.innerHTML = dateFormat;
        dateElement.classList.add('date');
        task.appendChild(taskContentDate);
        taskContentDate.appendChild(taskContent);
        taskContentDate.appendChild(dateElement);
        taskContentDate.appendChild(deleteIcon(id));
    
    return task
  };