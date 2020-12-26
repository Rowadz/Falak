import { RootState } from 'app/store'

export const selectCount = (eventType: 'UPDATE' | 'DELETE' | 'INSERT') => ({
  dashboard,
}: RootState): number =>
  dashboard.events.filter(({ type }: any) => type === eventType).length
