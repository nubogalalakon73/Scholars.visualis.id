import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import DocumentPage from "./pages/Document.jsx";
import Universities from "./pages/Universities.jsx";
import UniversityPage from "./pages/University.jsx";
import Disciplines from "./pages/Disciplines.jsx";
import DisciplinePage from "./pages/Discipline.jsx";
import Partnership from "./pages/Partnership.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/document/:id" element={<DocumentPage />} />
      <Route path="/universities" element={<Universities />} />
      <Route path="/university/:id" element={<UniversityPage />} />
      <Route path="/disciplines" element={<Disciplines />} />
      <Route path="/discipline/:id" element={<DisciplinePage />} />
      <Route path="/partnership" element={<Partnership />} />
    </Routes>
  );
}
