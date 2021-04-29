import IDE from '../../assets/components/IDE/Ide';
import Simulator from '../../assets/components/Simulator/Simulator';
import TourAlert from './TourAlert';
import { useState, useEffect } from 'react';
function App() {
      const [isTourOpen, setIsTourOpen] = useState(false)
      const [tourAlert, setTourAlert] = useState(false)

      useEffect(() => {
        if (!window.localStorage || window.localStorage.isReturningVisitor) {
            //old browser so no local storage, dont want to store cookies so they just wont get a tour :(
            // or they are returning visitor so dont show tour
        } else {
            setTourAlert(true)
            window.localStorage.isReturningVisitor = true
        }
    }, [])

  return (
    <div className="mx-2 my-2">
      {tourAlert && <TourAlert setTourAlert={setTourAlert} setIsTourOpen={setIsTourOpen}/>}
      <Simulator />
      <IDE isTourOpen={isTourOpen} setIsTourOpen={setIsTourOpen} />
    </div>
  );
}

export default App;
