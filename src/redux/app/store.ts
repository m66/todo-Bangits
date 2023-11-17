import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../features/todos/todosSlice'
import counterReducer from '../features/counter/counterSlice'
import isTouredReducer from '../features/isToured/isTouredSlice'
import trashedTodosReducer from '../features/trashedTodos/trashedTodosSlice'


export const store = configureStore({
  reducer: {
    todos: todoReducer,
    isToured: isTouredReducer,
    counter: counterReducer,
    trashedTodos: trashedTodosReducer,
  },
})
