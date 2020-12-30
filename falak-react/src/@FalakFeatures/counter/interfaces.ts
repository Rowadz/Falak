import { Children } from 'app/interfaces/children'
export interface CounterFeatureProps extends Children {
  eventType: 'INSERT' | 'UPDATE' | 'DELETE' | 'ALL'
}
