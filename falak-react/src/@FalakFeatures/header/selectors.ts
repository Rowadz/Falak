import { RootState } from 'app/store'

export const selectConnectionStatus = ({ dashboard }: RootState): boolean =>
  dashboard.connectionStatus
