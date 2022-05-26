import styled from '@emotion/styled';
import 'rsuite/dist/rsuite.min.css';
import { AppNavBar, KPI, TablesPicker } from './components';
import { Container, FlexboxGrid, CustomProvider, Panel, Col } from 'rsuite';
import { GrMysql } from 'react-icons/gr';
import { WebSocketContextProvider } from './hooks';
import {
  tablesToMonitorSelector,
  useStore,
  dataByTableSelector,
  themeSelector,
  FalakTheme,
} from './store';

const CustomContainer = styled(Container)`
  margin: 1rem;
`;

export function App() {
  const tableNames = useStore(tablesToMonitorSelector);
  const theme: FalakTheme = useStore(themeSelector);
  const dataByTable = useStore(dataByTableSelector);
  console.log({ dataByTable });

  return (
    <WebSocketContextProvider>
      <CustomProvider theme={theme}>
        <AppNavBar />
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
