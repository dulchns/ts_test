export default class ListItem {
    constructor({ title, completed }) {
        this.value = title;
        this.completed = completed;
    }
    createItem() {
        const item = document.createElement('div');
        const title = document.createElement('p');
        const check = document.createElement('input');
        check.type = 'checkbox';
        check.checked = this.completed;
        title.textContent = this.value;
        item.append(check, title);
        item.classList.add('todo-item');
        return item;
    }
}
