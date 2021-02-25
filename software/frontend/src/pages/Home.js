import IDE from '../assets/components/ide'
import Simulator from '../assets/components/simulator'
import { Container } from 'react-bootstrap'
function App() {
  return (
    <Container fluid className="my-2">
      <Simulator />
      <IDE />
    </Container>
  );
}

export default App;
