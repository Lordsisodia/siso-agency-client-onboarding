
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import PlanBuilder from './pages/PlanBuilder';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/plan-builder" element={<PlanBuilder />} />
      </Routes>
    </div>
  );
}

export default App;
