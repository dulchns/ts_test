import ListItem from "../ListItem/ListItem.js"
import { IData, IList } from "../../types.js"

export default class TodoList implements IList{
    root: HTMLDivElement
    screen: HTMLDivElement
    controls: HTMLDivElement
    
    constructor(root: HTMLDivElement) {
        this.root = root
        this.screen = root.querySelector('.todo-screen') as HTMLDivElement
        this.controls = root.querySelector('.todo-controls') as HTMLDivElement

        if(this.controls) this.controls.onsubmit = this.addItem.bind(this)
    }

    getData():Array<IData> {
        const data = localStorage.getItem('todos')
        return data ? JSON.parse(data) : []
    }

    setData(data: Array<IData>):void {
        localStorage.setItem('todos', JSON.stringify(data))
    }

    render():void {
        const items = this.getData().map(el => new ListItem(this, el).createItem())
        this.screen.innerHTML = ''
        this.screen.append(...items)
    }

    addItem(e: SubmitEvent):void {
        e.preventDefault()
        const input = this.controls.children[0] as HTMLInputElement
        const items = this.getData()
        items.push({id: items[items.length - 1].id + 1, title: input.value, completed: false})
        this.setData(items)
        this.render()
        input.value = ''
    }
}