export interface IList {
    root: HTMLDivElement
    screen: HTMLDivElement
    controls: HTMLDivElement
    getData: () => Array<IData>
    setData: (data: Array<IData>) => void
    render: () => void
}

export interface IData {
    id: number
    title: string
    completed: boolean
}