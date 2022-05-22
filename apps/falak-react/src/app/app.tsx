import styled from '@emotion/styled';
import 'rsuite/dist/rsuite.min.css';
import { AppNavBar, TablesPicker } from './components';
import { Container, FlexboxGrid, CustomProvider, Panel } from 'rsuite';
import { GrMysql } from 'react-icons/gr';
import { FcPlus, FcFullTrash, FcSynchronize } from 'react-icons/fc';
// FcDeleteDatabase
import { WebSocketContextProvider } from './hooks';
// import { Route, Routes, Link } from 'react-router-dom';
import { tablesToMonitorSelector, useStore, dataByTableSelector } from './store';
// import { getOptions } from './chartOptions';

const CustomContainer = styled(Container)`
  margin: 1rem;
`;

export function App() {
  const tableNames = useStore(tablesToMonitorSelector);
  const dataByTable = useStore(dataByTableSelector);
  const store = useStore();
  console.log(store.dataByTable);
  return (
    <WebSocketContextProvider>
      <CustomProvider theme="dark">
        <AppNavBar />
        <CustomContainer>
          <FlexboxGrid>
            <FlexboxGrid.Item colspan={6}>
              <h5 css={{ marginBottom: '1rem' }}>
                List of all the tables in your database <GrMysql />
              </h5>
              <TablesPicker />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={18}>
              <CustomContainer>
                <FlexboxGrid>
                  {tableNames?.map((tableName: string) => {
                    const { DELETE, INSERT, UPDATE } = dataByTable[tableName] || {
                      DELETE: 0,
                      INSERT: 0,
                      UPDATE: 0,
                    };
                    const total = DELETE + INSERT + UPDATE;
                    return (
                      <FlexboxGrid.Item key={tableName} colspan={24}>
                        <Panel
                          header={
                            <h4>
                              {tableName} table [{total}]
                            </h4>
                          }
                          bordered>
                          <FlexboxGrid css={{ textAlign: 'center' }}>
                            <FlexboxGrid.Item colspan={8}>
                              <CustomContainer>
                                <Panel
                                  header={
                                    <h5>
                                      <FcPlus /> inserts {((INSERT / total) * 100).toFixed(2)}%
                                    </h5>
                                  }
                                  bordered>
                                  <h5>{INSERT}</h5>
                                </Panel>
                              </CustomContainer>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item colspan={8}>
                              <CustomContainer>
                                <Panel
                                  header={
                                    <h5>
                                      <FcSynchronize /> updates{' '}
                                      {((UPDATE / total) * 100).toFixed(2)}%
                                    </h5>
                                  }
                                  bordered>
                                  <h5>{UPDATE}</h5>
                                </Panel>
                              </CustomContainer>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item colspan={8}>
                              <CustomContainer>
                                <Panel
                                  header={
                                    <h5>
                                      <FcFullTrash /> deletes {((DELETE / total) * 100).toFixed(2)}%
                                    </h5>
                                  }
                                  bordered>
                                  <h5>{DELETE}</h5>
                                </Panel>
                              </CustomContainer>
                            </FlexboxGrid.Item>
                          </FlexboxGrid>
                        </Panel>
                      </FlexboxGrid.Item>
                    );
                  })}
                </FlexboxGrid>
              </CustomContainer>

              {/* <CustomContainer>
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
                })}
              </CustomContainer> */}
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </CustomContainer>
      </CustomProvider>

      {/* <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route. <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes> */}
    </WebSocketContextProvider>
  );
}

export default App;
