import { createSlice } from '@reduxjs/toolkit'

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    events: [] as Array<unknown>,
  },
  reducers: {
    addEvent(state, { payload }) {
      state.events.push(payload)
    },
  },
})

export const { addEvent } = dashboardSlice.actions

export default dashboardSlice.reducer
