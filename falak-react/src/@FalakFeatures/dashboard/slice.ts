import { createSlice } from '@reduxjs/toolkit'

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    events: [] as Array<unknown>,
    connectionStatus: false,
  },
  reducers: {
    addEvent(state, { payload }) {
      state.events.push(payload)
    },
    changeConnectionStatus(state, { payload }) {
      state.connectionStatus = payload
    },
  },
})

export const { addEvent, changeConnectionStatus } = dashboardSlice.actions

export default dashboardSlice.reducer
