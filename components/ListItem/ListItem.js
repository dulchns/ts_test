export default class ListItem {
    constructor(list, { id, title, completed }) {
        this.list = list;
        this.item = null;
        this.id = id;
        this.title = title;
        this.completed = completed;
    }
    createItem() {
        const item = document.createElement('div');
        const title = document.createElement('p');
        const check = document.createElement('input');
        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');
        check.type = 'checkbox';
        check.checked = this.completed;
        title.textContent = this.title;
        editBtn.textContent = 'Edit';
        deleteBtn.textContent = 'Delete';
        item.append(check, title, editBtn, deleteBtn);
        item.classList.add('todo-item');
        check.addEventListener('change', () => {
            this.taskChange({ id: this.id, title: this.title, completed: !this.completed });
        });
        editBtn.addEventListener('click', () => {
            this.edit();
        });
        deleteBtn.addEventListener('click', () => {
            this.taskChange();
        });
        return this.item = item;
    }
    taskChange(value) {
        let data = this.list.getData();
        data = data.filter(el => el.id !== this.id);
        if (value) {
            data.push(value);
            data.sort((a, b) => a.id - b.id);
        }
        this.list.setData(data);
        this.list.render();
    }
    edit() {
        var _a;
        const input = document.createElement('input');
        input.value = ((_a = this.item) === null || _a === void 0 ? void 0 : _a.children[1]).textContent || '';
        if (this.item) {
            this.item.innerHTML = '';
            this.item.append(input);
            input.focus();
        }
        const changeApply = (e) => {
            if (e.key === 'Enter') {
                this.taskChange({ id: this.id, title: input.value, completed: this.completed });
                input.removeEventListener('keydown', changeApply);
            }
        };
        const changeDecline = (e) => {
            input.removeEventListener('keydown', changeApply);
            input.removeEventListener('blur', changeDecline);
            this.list.render();
        };
        input.addEventListener('keydown', changeApply);
        input.addEventListener('blur', changeDecline);
    }
}
