import { createSlice } from '@reduxjs/toolkit'
import { TrashedTodosState } from '../../../interfaces/mainInterface'

const initialState: TrashedTodosState = {
  trashedTodos: [],
}

export const trashedTodosSlice = createSlice({
  name: 'trashedTodos',
  initialState,
  reducers: {
    addToTrashedTodo: (state, action) => {
      state.trashedTodos = [...state.trashedTodos, action.payload]
    },
    deleteTodo: (state, action) => {
      state.trashedTodos = state.trashedTodos.filter(
        (todo) => todo.id !== action.payload.id,
      )
    },
    deleteAllTodos: (state) => {
      state.trashedTodos = []
    },
  },
})

export const {
  addToTrashedTodo,
  deleteTodo,
  deleteAllTodos,
} = trashedTodosSlice.actions
export default trashedTodosSlice.reducer
