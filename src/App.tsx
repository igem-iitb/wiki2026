import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import KytPage from './pages/KytPage';
import AttributionPage from './pages/AttributionPage';
import SustainabilityPage from './pages/SustainabilityPage';
import IhpPage from './pages/IhpPage';
import EducationPage from './pages/EducationPage';
import ProjectDescriptionPage from './pages/ProjectDescriptionPage';
import ProjectEngineeringPage from './pages/ProjectEngineeringPage';
import EntrepreneurshipPage from './pages/EntrepreneurshipPage';
import NewsPage from './pages/NewsPage';
import FutureScopePage from './pages/FutureScopePage';
import ResultsPage from './pages/ResultsPage';
import ContributionPage from './pages/ContributionPage';
import ProtocolsPage from './pages/wetlab/ProtocolsPage';
import NotebookPage from './pages/wetlab/NotebookPage';
import PartsPage from './pages/wetlab/PartsPage';
import SafetyPage from './pages/wetlab/SafetyPage';
import DryLabPage, { DryLabModelRoute } from './pages/drylab/DryLabPage';

export default function App() {
  return (
    <div className="min-h-full flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/description" element={<ProjectDescriptionPage />} />
        <Route path="/project/engineering" element={<ProjectEngineeringPage />} />
        <Route path="/project/news" element={<NewsPage />} />
        <Route path="/project/results" element={<ResultsPage />} />
        <Route path="/project/contribution" element={<ContributionPage />} />
        <Route path="/project/future-scope" element={<FutureScopePage />} />
        <Route path="/human-practices/entrepreneurship" element={<EntrepreneurshipPage />} />
        <Route path="/team/kyt" element={<KytPage />} />
        <Route path="/team/attribution" element={<AttributionPage />} />
        <Route path="/sustainability" element={<SustainabilityPage />} />
        <Route path="/human-practices/ihp" element={<IhpPage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/wet-lab/protocols" element={<ProtocolsPage />} />
        <Route path="/wet-lab/notebook" element={<NotebookPage />} />
        <Route path="/wet-lab/parts" element={<PartsPage />} />
        <Route path="/wet-lab/safety" element={<SafetyPage />} />
        <Route path="/dry-lab" element={<DryLabPage slug="home" />} />
        <Route path="/dry-lab/model" element={<DryLabPage slug="model" />} />
        <Route path="/dry-lab/model/:slug" element={<DryLabModelRoute />} />
        <Route path="/dry-lab/software" element={<DryLabPage slug="software" />} />
        <Route path="/dry-lab/cfd" element={<DryLabPage slug="cfd" />} />
        <Route path="/dry-lab/lca" element={<DryLabPage slug="lca" />} />
        <Route path="/dry-lab/contribution" element={<Navigate to="/project/contribution" replace />} />
      </Routes>
    </div>
  );
}
