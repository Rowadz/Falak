import { RootState } from 'app/store'

export const selectTypeTimeline = ({ dashboard }: RootState) =>
  dashboard.events.reduce((map: any, { timestamp, type }: any) => {
    const time = new Date(timestamp)
    if (type in map) {
      const { values, cache } = map[type]
      const newCacheVal = cache[time.toString()]
        ? cache[time.toString()] + 1
        : 1
      map[type] = {
        values: [...values, [time, newCacheVal]],
        cache: { [time.toString()]: newCacheVal },
      }
    } else {
      map[type] = {
        values: [[time, 1]],
        cache: { [time.toString()]: 1 },
      }
    }
    return map
  }, {})

export const selectTimes = ({ dashboard }: RootState) =>
  Array.from(new Set(dashboard.events.map(({ timestamp }: any) => timestamp)))
