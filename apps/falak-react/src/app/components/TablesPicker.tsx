import { TagPicker } from 'rsuite';
import type { TagPickerProps } from 'rsuite';
import { useStore, setTablesToBeMonitoredSelector, tableNamesSelector } from '../store';

export const TablesPicker = (props: Partial<TagPickerProps>) => {
  const tables: string[] = useStore(tableNamesSelector);
  const setTablesToBeMonitored = useStore(setTablesToBeMonitoredSelector);

  return (
    <TagPicker
      css={{ width: '100%' }}
      placeholder="Select a table to monitor"
      onChange={setTablesToBeMonitored}
      data={tables.map((tableName: string) => ({ label: tableName, value: tableName })) || []}
      {...(props || {})}
    />
  );
};
