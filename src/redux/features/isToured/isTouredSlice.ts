// this #counter is intended for counting todos 
// and assigned as ID

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isToured: false,
}

export const isTouredSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    toured: (state) => {
      state.isToured = true
    },
  },
})

export const { toured } = isTouredSlice.actions
export default isTouredSlice.reducer
