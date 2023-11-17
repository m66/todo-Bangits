// this #counter is intended for counting todos 
// and assigned as ID

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  counter: 1,
}

export const counterSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    increment: (state) => {
      state.counter = state.counter + 1
    },
  },
})

export const { increment } = counterSlice.actions
export default counterSlice.reducer
