import styled from '@emotion/styled';
import 'rsuite/dist/rsuite.min.css';
import { AppNavBar, Chart, TablesPicker } from './components';
import { Container, FlexboxGrid } from 'rsuite';
import { WebSocketContextProvider } from './hooks';
// import { Route, Routes, Link } from 'react-router-dom';
import { tablesToMonitorSelector, useStore, dataByTableSelector } from './store';
import { getOptions } from './chartOptions';

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
      <AppNavBar />
      <CustomContainer>
        <FlexboxGrid>
          <FlexboxGrid.Item colspan={6}>
            <TablesPicker />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={18}>
            <Container>
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
                          formatter: '{b}S: {c} ({d}%)',
                        },
                        animation: false,
                        // animationDelay: function (idx) {
                        //   return 10;
                        // },
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
            </Container>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </CustomContainer>

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
