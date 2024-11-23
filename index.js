import {
    onGetTasks,
    saveTask,
    deleteTask,
    getTask,
    updateTask,
  } from "/firebase.js";
  
  const taskForm = document.getElementById("task-form");
  const tasksContainer = document.getElementById("tasks-container");
  
  let editStatus = false;
  let id = "";
  
  window.addEventListener("DOMContentLoaded", async (e) => {
  
    onGetTasks((querySnapshot) => {
      tasksContainer.innerHTML = "";
  
      querySnapshot.forEach((doc) => {
        const task = doc.data();
  
        tasksContainer.innerHTML += `
          <div class="tabla">
          <table>
          <tr>
           <td><p id= "title"> ${task.title}</p></td>
           <td><p id= "descripcion" > ${task.description}</p></td>
          <td>
           <div id="botones">
           <div id="borrar">
            <buttonn class="delete" data-id="${doc.id}">
              Eliminar
            </buttonn> </div>
             <div id="editar">
            <buttonn class="edit" data-id="${doc.id}">
              Editar
            </buttonn></div>
          
       
          </td>
          </tr>
          </table>
          </div>`;
      })
  
    
      const btnsDelete = tasksContainer.querySelectorAll(".delete");
      btnsDelete.forEach((btn) =>
        btn.addEventListener("click", async ({ target: { dataset } }) => {
          try {
            await deleteTask(dataset.id);
          } catch (error) {
            console.log(error);
          }
        })
      );
  
      const btnsEdit = tasksContainer.querySelectorAll(".edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            const doc = await getTask(e.target.dataset.id);
            const task = doc.data();
            taskForm["task-title"].value = task.title;
            taskForm["task-description"].value = task.description;
  
            editStatus = true;
            id = doc.id;
            taskForm["btn-task-form"].innerText = "Actualizar";
          } catch (error) {
            console.log(error);
          }
        });
      });
    });
  });
  
  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const title = taskForm["task-title"];
    const description = taskForm["task-description"];
  
    try {
      if (!editStatus) {
        await saveTask(title.value, description.value);
      } else {
        await updateTask(id, {
          title: title.value,
          description: description.value,
        });
  
        editStatus = false;
        id = "";
        taskForm["btn-task-form"].innerText = "Guardar";
      }
  
      taskForm.reset();
      title.focus();
    } catch (error) {
      console.log(error);
    }
  });
  
  