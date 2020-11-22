import Navbar from './assets/components/navbar';
import IDE from './assets/components/ide'

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <div className="row">
          <h1>Drone Control</h1>
        </div>
        <IDE />
      </div>
    </div>
  );
}

export default App;
