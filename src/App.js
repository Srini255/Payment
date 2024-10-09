import './App.css';
import PaymentDetails from './PaymentScreens.js';
 // Adjust the path based on where your logo is located
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/iitm-payment/:VistorTypeID/:VehicleType/:RecurringEntryPaSSID' element={<PaymentDetails />}/>
        </Routes>
        
      </div>
    </Router>

  );
}

export default App;
