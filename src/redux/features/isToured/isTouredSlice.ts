// this state is intended for showing Tour Component only once

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
