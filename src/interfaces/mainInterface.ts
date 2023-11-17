export interface ITodoItem {
  id: number
  title: string
  description: string
  deadline: string
  status: string
}

export interface TrashedTodosState {
  trashedTodos: ITodoItem[]
}

export interface TodosState {
  todos: ITodoItem[]
}
