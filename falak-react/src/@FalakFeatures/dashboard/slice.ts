import { createSlice } from '@reduxjs/toolkit'

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    events: [] as Array<unknown>,
    connectionStatus: false,
    tables: {} as Record<string, Record<string, number>>,
  },
  reducers: {
    addEvent(state, { payload }) {
      state.events.push(payload)
      const { type, table } = payload
      if (!(table in state.tables)) {
        state.tables[table] = {}
      }
      state.tables[table][type] = (state.tables[table][type] || 0) + 1
    },
    changeConnectionStatus(state, { payload }) {
      state.connectionStatus = payload
    },
  },
})

export const { addEvent, changeConnectionStatus } = dashboardSlice.actions

export default dashboardSlice.reducer
