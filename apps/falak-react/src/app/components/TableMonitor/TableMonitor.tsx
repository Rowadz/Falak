import { FlexboxGrid, Panel, Col } from 'rsuite';
import { GrMysql } from 'react-icons/gr';
import { tablesToMonitorSelector, useStore, dataByTableSelector } from '../../store';
import { KPI, TablesPicker, CustomContainer } from '..';

export const TableMonitor = () => {
  const tableNames = useStore(tablesToMonitorSelector);
  const dataByTable = useStore(dataByTableSelector);

  return (
    <CustomContainer>
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={6} as={Col} xs={24} md={6} lg={6}>
          <h5 css={{ marginBottom: '1rem' }}>
            The tables in your database <GrMysql /> select one to subscribe to
          </h5>
          <TablesPicker />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={18} as={Col} xs={24} md={18} lg={18}>
          <CustomContainer>
            <FlexboxGrid>
              {tableNames?.map((tableName: string) => {
                const { DELETE = 0, INSERT = 0, UPDATE = 0 } = dataByTable[tableName] || {};
                const total = DELETE + INSERT + UPDATE;
                const totalFormatted = total.toLocaleString('en-US');
                return (
                  <FlexboxGrid.Item key={tableName} colspan={24} css={{ marginBottom: '1rem' }}>
                    <Panel
                      header={
                        <h4>
                          {tableName} table [{totalFormatted}]
                        </h4>
                      }
                      bordered>
                      <FlexboxGrid css={{ textAlign: 'center' }}>
                        <KPI INSERT={INSERT} DELETE={DELETE} total={total} UPDATE={UPDATE} />
                      </FlexboxGrid>
                    </Panel>
                  </FlexboxGrid.Item>
                );
              })}
            </FlexboxGrid>
          </CustomContainer>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </CustomContainer>
  );
};
