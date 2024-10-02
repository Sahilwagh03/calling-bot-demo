import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CallInitiateForm from './Pages/CallInitiateForm';
import Conversion from './Pages/Conversion';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CallInitiateForm />} />
          <Route path="/conversion" element={<Conversion />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
