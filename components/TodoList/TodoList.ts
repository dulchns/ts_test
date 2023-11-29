import ListItem from "../ListItem/ListItem.js"
import { IData, IList } from "../../types.js"

export default class TodoList {
    root: HTMLDivElement | null
    screen: HTMLDivElement | null
    controls: HTMLDivElement | null
    
    constructor(root: HTMLDivElement | null) {
        this.root = root
        this.screen = root ? root.querySelector('.todo-screen') : null
        this.controls = root ? root.querySelector('.todo-controls') : null

        if(this.controls) this.controls.onsubmit = this.addItem.bind(this)
    }

    getData():Array<IData> {
        const data: string | null = localStorage.getItem('todos')
        return data ? JSON.parse(data) : []
    }

    setData(data: Array<IData>):void {
        localStorage.setItem('todos', JSON.stringify(data))
    }

    render():void {
        const items = this.getData().map(el => new ListItem(this, el).createItem())
        if(this.screen) this.screen.innerHTML = ''
        this.screen?.append(...items)
    }

    addItem(e: SubmitEvent):void {
        e.preventDefault()
        const input = <HTMLInputElement>this.controls?.children[0]
        const items = this.getData()
        items.push({id: items[items.length - 1].id + 1, title: input.value, completed: false})
        this.setData(items)
        this.render()
        input.value = ''
    }
}