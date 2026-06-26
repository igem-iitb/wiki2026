import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import KytPage from './pages/KytPage';
import AttributionPage from './pages/AttributionPage';
import SustainabilityPage from './pages/SustainabilityPage';

export default function App() {
  return (
    <div className="min-h-full flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team/kyt" element={<KytPage />} />
        <Route path="/team/attribution" element={<AttributionPage />} />
        <Route path="/sustainability" element={<SustainabilityPage />} />
      </Routes>
    </div>
  );
}
