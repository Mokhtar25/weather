import ProjectGen from "./modules/project";

export default function DomHandel() {
  const makeproject = ProjectGen();

  const add_project_btn = document.querySelector(".add_project_btn");
  const close_project = document.querySelector(".exit_project_btn");
  let sidemeanu = document.querySelector(".project_list");
  let project_list = [];
  let current_project = false;

  function first() {
    const data = getstore();
    data.forEach((e) => {
      const pro = addProject(e.project_name);
      current_project = pro;
      e.list.items.forEach((item) => {
        addNoteManual(current_project, item.name, item.note, item.date, true);
      });
    });
    displayMain(project_list[0]);
  }
  // first();

  function addProject(project1) {
    const project = makeproject(project1);
    project_list.push(project);

    const new_div = document.createElement("div");
    new_div.classList.add("project_item");
    new_div.textContent = project.project_name;
    new_div.value = project.number;
    addlistner(new_div);
    sidemeanu.appendChild(new_div);
    const index = project_list.length - 1;
    current_project = project_list[index];
    displayMain(project);

    savetolocal();
    function addlistner(div) {
      div.addEventListener("click", () => {
        current_project = project;
        displayMain(project);
      });
    }
    savetolocal();
    return project;
  }

  function runfirst() {
    refreshmain();
    current_project = project_list[0];
    displayMain(current_project);
  }
  function addNoteManual(pname, title, notes, date, important) {
    pname.list.addItem(title, notes, date, important);
  }

  function refreshmain() {
    const todos = [];
    project_list.forEach((e) => {
      e.list.getItems().forEach((element) => {
        element.project = e.number;
        if (todos.findIndex((e) => element.name === e.name) === -1) {
          todos.push(element);
        }
      });
    });
    project_list[0].list.items = todos;
  }

  function displayMain(project) {
    const items = project.list.items;

    const container = document.querySelector(".notes_wrap");
    if (items.length === 0) {
      container.textContent = "New Project, Add Notes to Start";
      container.classList.add("empty");
      return;
    }
    container.classList.remove("empty");
    container.innerHTML = "";
    items.forEach((element) => {
      const frag = document.createDocumentFragment();

      const wraper = document.createElement("div");
      wraper.classList.add("notewrap");

      const note = document.createElement("div");
      note.classList.add("note");
      note.textContent = element.name;
      note.value = element.id;

      const list = document.createElement("ul");
      list.classList.add("list");
      const box = document.createElement("li");
      box.classList.add("done");
      const input_box = document.createElement("input");
      input_box.type = "checkbox";
      input_box.checked = element.done;
      box.appendChild(input_box);
      list.appendChild(box);
      const trash = document.createElement("li");
      trash.classList.add("trash");
      list.appendChild(trash);

      if (element.done === true) {
        wraper.classList.add("done_note");
      }

      addfunctoitem(wraper, input_box, trash, element, project);
      wraper.appendChild(note);
      wraper.appendChild(list);
      frag.appendChild(wraper);
      container.appendChild(frag);
    });
  }
  function addfunctoitem(wrap, checkbox, trash, note, project) {
    checkbox.addEventListener("click", () => {
      note.done = checkbox.checked;
      if (note.done === true) {
        wrap.classList.add("done_note");
      } else {
        wrap.classList.remove("done_note");
      }
      savetolocal();
    });
    trash.addEventListener("click", () => {
      wrap.classList.add("hide");
      if (note.project != "") {
        let index = project_list.findIndex((e) => {
          if (e.number === note.project) {
            return true;
          }
        });
        project_list[index].list.removeItem(note.id);
      }
      project.list.removeItem(note.id);
      refreshmain();
      // add stuff to edit the items it self or delete it without interfiranxe:
      displayMain(current_project);
      savetolocal();
    });
  }

  function addprojectbtn() {
    const dialog = document.querySelector("#modal");
    const input = document.querySelector(".add_project input");
    const save_btn = document.querySelector(".submit_project");

    dialog.addEventListener("close", () => {
      input.value = "";
    });
    add_project_btn.addEventListener("click", () => {
      dialog.showModal();
    });
    close_project.addEventListener("click", () => {
      input.value = "";
      dialog.close();
    });

    save_btn.addEventListener("click", () => {
      if (input.value == "") {
        alertmessage("Please enter a Valid Project name");
      } else if (input.value.length > 50) {
        alertmessage("Project Name cannot be more than 50 charchter");
      } else {
        addProject(input.value);
        dialog.close();
        input.value = "";
      }
    });

    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        save_btn.click();
      }
    });
  }

  addprojectbtn();

  function addnote() {
    const dialog = document.querySelector("#noted");
    const add_note_btn = document.querySelector(".add_note");
    const save_btn = document.querySelector(".submit_note");
    const title = document.querySelector("#noted .title");
    const note = document.querySelector("#noted .note");
    const date = document.querySelector("#noted .date");
    const important = document.querySelector("#noted .range");

    dialog.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        save_btn.click();
      }
    });
    function clear() {
      date.value = "";
      title.value = "";
      important.checked = false;
      note.value = "";
    }
    dialog.addEventListener("close", () => clear());
    add_note_btn.addEventListener("click", () => {
      dialog.showModal();
    });
    save_btn.addEventListener("click", () => {
      if (title.value === "") {
        alertmessage("Must enter a to do name");
        return false;
      }
      if (date.value == "") {
        alertmessage("must enter a due date");
        return false;
      }

      current_project.list.addItem(
        title.value,
        note.value,
        date.value,
        important.checked,
      );

      refreshmain();
      dialog.close();
      displayMain(current_project);
      savetolocal();
      clear();
    });
  }
  addnote();

  function alertmessage(mess) {
    const alert = document.querySelector(".alert");
    alert.textContent = mess;
    alert.classList.add("alert_show");
    setTimeout(() => alert.classList.remove("alert_show"), 5000);
  }

  function savetolocal() {
    localStorage.removeItem("list");
    const data1 = JSON.stringify(project_list);
    localStorage.setItem("list", data1);
  }
  function getstore() {
    const data = localStorage.getItem("list");
    return JSON.parse(data);
  }
  return {
    addProject,
    displayMain,
    refreshmain,
    addNoteManual,
    current_project,
    displayMain,
    project_list,
    runfirst,
    savetolocal,
    first,
  };
}
