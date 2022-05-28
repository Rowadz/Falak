import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { GET_ROW_TIMELINE, RowTimeline as RowTimelineType, TIMELINE } from '@falak/constants';
import { Input, FlexboxGrid, InputGroup, Timeline } from 'rsuite';
import { CustomContainer } from '..';
import ReactDiffViewer from 'react-diff-viewer';
import { FcPlus, FcFullTrash, FcSynchronize } from 'react-icons/fc';
import { useWebSocketContext } from '../../hooks';
import { themeSelector, FalakTheme, useStore } from '../../store';
import { TablesPicker } from '../TablesPicker';

export const RowTimeline = () => {
  const socket = useWebSocketContext();
  const theme: FalakTheme = useStore(themeSelector);
  const [rowTinelineData, setRowTinelineData] = useState<RowTimelineType[]>([]);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    socket?.on(TIMELINE, (data: RowTimelineType[]) => {
      setRowTinelineData(data);
    });
  }, [socket]);

  // TODO:: make this better, make the backend send events
  const getRowTimeLine = () => {
    if (!ref.current?.value) {
      return;
    }
    setInterval(() => {
      // @ts-expect-error type never?
      socket?.emit(GET_ROW_TIMELINE, +ref.current?.value);
    }, 1000);
  };

  return (
    <CustomContainer>
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={12}>
          <TablesPicker size="lg" />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={12}>
          <InputGroup>
            <Input size="lg" placeholder="Enter the row id here" inputRef={ref} />
            <InputGroup.Button onClick={getRowTimeLine}>Subscribe to timeline</InputGroup.Button>
          </InputGroup>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={24}>
          <Timeline endless>
            {rowTinelineData.map((snapshot: RowTimelineType, i: number) => (
              <Timeline.Item
                key={i}
                dot={
                  <>
                    {snapshot.type === 'INSERT' && <FcPlus />}
                    {snapshot.type === 'UPDATE' && <FcSynchronize />}
                    {snapshot.type === 'DELETE' && <FcFullTrash />}
                  </>
                }>
                <>
                  {snapshot.type} -{' '}
                  {dayjs.unix(snapshot.created_at / 1000).format('MM/DD/YYYY HH:mm:s.SSS')}
                  {/* {dayjs.duration(1653734037354 / 1000, 'millisecond').humanize()} - ago */}
                  <ReactDiffViewer
                    useDarkTheme={theme === 'dark'}
                    oldValue={JSON.stringify(snapshot?.before || {}, null, 2)}
                    newValue={JSON.stringify(snapshot?.after || {}, null, 2)}
                    splitView
                  />
                </>
              </Timeline.Item>
            ))}
          </Timeline>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </CustomContainer>
  );
};

/* <CustomContainer>
          {tableNames?.map((tableName: string) => {
            const total =
              dataByTable[tableName]?.DELETE +
              dataByTable[tableName]?.INSERT +
              dataByTable[tableName]?.UPDATE;
            return (
              <Chart
                key={tableName}
                options={getOptions({
                  title: { text: `${tableName} table [${total}] total queries` },
                  series: {
                    name: tableName,
                    type: 'pie',
                    radius: '50%',
                    // label: { show: false },
                    label: {
                      color: '#fff',
                      formatter: '{b}S: {c} ({d}%)',
                    },
                    // animation: false,
                    // animationDelay: (idx) => 10 * idx,
                    data: [
                      {
                        value: dataByTable[tableName]?.DELETE,
                        name: 'DELETE',
                        itemStyle: { color: '#DE5B49' },
                      },
                      {
                        value: dataByTable[tableName]?.INSERT,
                        name: 'INSERT',
                        itemStyle: { color: '#18778C' },
                      },
                      {
                        value: dataByTable[tableName]?.UPDATE,
                        name: 'UPDATE',
                        itemStyle: { color: '#FFB39C' },
                      },
                    ],
                    emphasis: {
                      itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                      },
                    },
                  },
                })}
              />
            );
          })
          */
