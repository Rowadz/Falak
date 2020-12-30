import { RootState } from 'app/store'

export const selectTableNames = ({
  dashboard: { tables },
}: RootState): Array<string> => Object.keys(tables)

export const selectTables = ({
  dashboard: { tables },
}: RootState): Record<string, Record<string, number>> => tables
