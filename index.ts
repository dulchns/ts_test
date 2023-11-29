import TodoList from "./components/TodoList/TodoList.js";

const root = document.querySelector('.todo-list') as HTMLDivElement
const list = new TodoList(root)
list.render()