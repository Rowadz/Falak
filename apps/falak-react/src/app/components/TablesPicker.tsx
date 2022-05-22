import { TagPicker } from 'rsuite';
import { useWebSocketContext } from '../hooks';
import { useStore, setTablesToBeMonitoredSelector } from '../store';

export const TablesPicker = () => {
  const { tables } = useWebSocketContext();
  const setTablesToBeMonitored = useStore(setTablesToBeMonitoredSelector);

  // console.log({ tables });
  return (
    <TagPicker
      css={{ width: '100%' }}
      placeholder="Select a table to monitor"
      onChange={setTablesToBeMonitored}
      data={tables?.map((tableName: string) => ({ label: tableName, value: tableName })) || []}
    />
  );
};
