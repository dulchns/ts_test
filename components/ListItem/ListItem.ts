import { IData, IList } from "../../types.js"

export default class ListItem {
    list: IList
    item: HTMLDivElement | null
    id: number
    title: string
    completed: boolean

    constructor(list: IList, {id, title, completed}: IData) {
        this.list = list
        this.item = null
        this.id = id
        this.title = title
        this.completed = completed
    }

    createItem():HTMLDivElement {
        const item = document.createElement('div')
        const title = document.createElement('p')
        const check = document.createElement('input')
        const editBtn = document.createElement('button')
        const deleteBtn = document.createElement('button')
        check.type = 'checkbox'
        check.checked = this.completed
        title.textContent = this.title
        editBtn.textContent = 'Edit'
        deleteBtn.textContent = 'Delete'
        item.append(check, title, editBtn, deleteBtn)
        item.classList.add('todo-item')
        check.addEventListener('change', ():void => {
            this.taskChange({id: this.id, title: this.title, completed: !this.completed})
        })
        editBtn.addEventListener('click', ():void => {
            this.edit()
        })
        deleteBtn.addEventListener('click', ():void => {
            this.taskChange()
        })
        return this.item = item
    }

    taskChange(value?: IData):void {
        let data = this.list.getData()
        data = data.filter(el => el.id !== this.id)
        if(value) { 
            data.push(value)
            data.sort((a, b) => a.id - b.id)
        }
        this.list.setData(data)
        this.list.render()
    }
    
    edit():void {
        const input = document.createElement('input')
        input.value = (<HTMLParagraphElement>this.item?.children[1]).textContent || ''
        if (this.item) {
            this.item.innerHTML = ''
            this.item.append(input)
            input.focus()
        }
        const changeApply = (e: KeyboardEvent):void => {
            if(e.key === 'Enter') {
                this.taskChange({id: this.id, title: input.value, completed: this.completed})
                input.removeEventListener('keydown', changeApply)
            }
        }
        const changeDecline = (e: FocusEvent):void => {
            input.removeEventListener('keydown', changeApply)
            input.removeEventListener('blur', changeDecline)
            this.list.render()
        }

        input.addEventListener('keydown', changeApply)
        input.addEventListener('blur', changeDecline)
    }
}