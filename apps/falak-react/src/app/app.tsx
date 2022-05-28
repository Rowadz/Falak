import 'rsuite/dist/rsuite.min.css';
import { AppNavBar, RowTimeline } from './components';
import { CustomProvider } from 'rsuite';
import { WebSocketContextProvider } from './hooks';
import { useStore, themeSelector, FalakTheme } from './store';
import { TableMonitor } from './components';
import { Route, Routes } from 'react-router-dom';
import { REACT_ROUTES } from '@falak/constants';

export function App() {
  const theme: FalakTheme = useStore(themeSelector);

  return (
    <WebSocketContextProvider>
      <CustomProvider theme={theme}>
        <AppNavBar />
      </CustomProvider>
      <Routes>
        <Route
          path={REACT_ROUTES.HOME}
          element={
            <div>
              <h1>TODO HOMEPAGE!</h1>
            </div>
          }
        />
        <Route path={REACT_ROUTES.TABLE_MONITOR} element={<TableMonitor />} />
        <Route path={REACT_ROUTES.ROW_TIMELINE} element={<RowTimeline />} />
      </Routes>
    </WebSocketContextProvider>
  );
}

export default App;
