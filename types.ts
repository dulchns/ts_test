export interface IList {
    root: HTMLDivElement | null
    screen: HTMLDivElement | null
    controls: HTMLDivElement | null
    getData(): Array<IData>
    setData(data: Array<IData>):void
    render():void
}

export interface IData {
    id: number
    title: string
    completed: boolean
}