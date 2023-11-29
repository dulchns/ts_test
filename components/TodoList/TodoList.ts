import ListItem from "../ListItem/ListItem.js"
import { IData } from "../../types.js"

export default class TodoList {
    root: HTMLDivElement | null
    screen: HTMLDivElement | null
    controls: HTMLDivElement | null

    constructor(root: HTMLDivElement | null) {
        this.root = root
        this.screen = root ? root.querySelector('.todo-screen') : null
        this.controls = root ? root.querySelector('.todo-controls') : null
    }

    getData():Array<IData> {
        const data: string | null = localStorage.getItem('todos')
        return data ? JSON.parse(data) : []
    }

    setData(data: Array<IData>):void {
        localStorage.setItem('todos', JSON.stringify(data))
    }

    render():void {
        const items = this.getData().map(el => new ListItem(el).createItem())
        this.screen?.append(...items)
    }
}