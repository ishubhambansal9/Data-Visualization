import { WineStatistics } from './components';
import { wineMockData } from './mock';

function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Wine Statistics</h1>
      <WineStatistics dataset={wineMockData} />
    </div>
  );
}

export default App;
