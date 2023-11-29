import ListItem from "../ListItem/ListItem.js";
export default class TodoList {
    constructor(root) {
        this.root = root;
        this.screen = root ? root.querySelector('.todo-screen') : null;
        this.controls = root ? root.querySelector('.todo-controls') : null;
        if (this.controls)
            this.controls.onsubmit = this.addItem.bind(this);
    }
    getData() {
        const data = localStorage.getItem('todos');
        return data ? JSON.parse(data) : [];
    }
    setData(data) {
        localStorage.setItem('todos', JSON.stringify(data));
    }
    render() {
        var _a;
        const items = this.getData().map(el => new ListItem(this, el).createItem());
        if (this.screen)
            this.screen.innerHTML = '';
        (_a = this.screen) === null || _a === void 0 ? void 0 : _a.append(...items);
    }
    addItem(e) {
        var _a;
        e.preventDefault();
        const input = (_a = this.controls) === null || _a === void 0 ? void 0 : _a.children[0];
        const items = this.getData();
        items.push({ id: items[items.length - 1].id + 1, title: input.value, completed: false });
        this.setData(items);
        this.render();
        input.value = '';
    }
}
