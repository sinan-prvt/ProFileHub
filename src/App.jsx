import { Routes, Route } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import HomePage from "./pages/HomePage";
import ResumePage from "./pages/ResumePage";
import CoverLettersPage from "./pages/CoverLettersPage";
import EmailsPage from "./pages/EmailsPage";
import FirstCallPage from "./pages/FirstCallPage";
import InterviewPage from "./pages/InterviewPage";
import WorkflowPage from "./pages/WorkflowPage";
import SalaryPage from "./pages/SalaryPage";
import ContactPage from "./pages/ContactPage";
import MorePage from "./pages/MorePage";

function App() {
  return (
    <div className="app-shell">
      <div className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/cover-letters" element={<CoverLettersPage />} />
          <Route path="/emails" element={<EmailsPage />} />
          <Route path="/first-call" element={<FirstCallPage />} />
          <Route path="/interview" element={<InterviewPage />} />
          <Route path="/workflow" element={<WorkflowPage />} />
          <Route path="/salary" element={<SalaryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/more" element={<MorePage />} />
        </Routes>
      </div>
      <BottomNav />
    </div>
  );
}

export default App;
