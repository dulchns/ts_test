import TodoList from "./components/TodoList/TodoList.js";
const root = document.querySelector('.todo-list');
const list = new TodoList(root);
list.render();
