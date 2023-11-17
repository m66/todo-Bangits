import { createSlice } from '@reduxjs/toolkit'
import { TodosState } from '../../../interfaces/mainInterface';

const initialState: TodosState = {
  todos: [],
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    completeTodo: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            status: 'completed',
          }
        } else {
          return todo
        }
      })
    },
    addTodo: (state, action) => {
      state.todos = [...state.todos, action.payload]
    },
    editTodo: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            ...action.payload,
          }
        } else {
          return todo
        }
      })
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id)
    },
    editStatusOverdue: (state, action) => {
      state.todos = state.todos.map(todo => {
        if(todo.id === action.payload.id) {
          return {
            ...todo,
            status: 'overdue'
          }
        } else {
          return todo
        }
      })
    }
  },
})

export const { completeTodo, addTodo, editTodo, deleteTodo, editStatusOverdue } = todoSlice.actions
export default todoSlice.reducer
