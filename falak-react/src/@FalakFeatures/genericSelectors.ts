import { RootState } from 'app/store'

export const selectCount = (
  eventType: 'UPDATE' | 'DELETE' | 'INSERT' | 'ALL'
) => ({ dashboard }: RootState): number =>
  eventType === 'ALL'
    ? dashboard.events.length
    : dashboard.events.filter(({ type }: any) => type === eventType).length
