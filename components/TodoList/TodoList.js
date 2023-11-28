import ListItem from "../ListItem/ListItem.js";
export default class TodoList {
    constructor(root) {
        this.root = root;
        this.screen = root ? root.querySelector('.todo-screen') : null;
        this.controls = root ? root.querySelector('.todo-controls') : null;
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
        const items = this.getData().map(el => new ListItem(el).createItem());
        (_a = this.screen) === null || _a === void 0 ? void 0 : _a.append(...items);
    }
}
