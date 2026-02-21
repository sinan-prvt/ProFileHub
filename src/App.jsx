import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Resume from "./components/Resume";
import CoverLetters from "./components/CoverLetters";
import EmailTemplates from "./components/EmailTemplates";
import Workflow from "./components/Workflow";
import InterviewPrep from "./components/InterviewPrep";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <Hero />
      <main className="bento-container">
        <section className="bento-item bento-item--full"><Resume /></section>
        <section className="bento-item bento-item--half"><CoverLetters /></section>
        <section className="bento-item bento-item--half"><EmailTemplates /></section>
        <section className="bento-item bento-item--full"><Workflow /></section>
        <section className="bento-item bento-item--half"><InterviewPrep /></section>
        <section className="bento-item bento-item--half"><Contact /></section>
      </main>
      <footer className="footer-simple">
        <p>&copy; {new Date().getFullYear()} SINAN. Built for technical perfection.</p>
      </footer>
    </div>
  );
}

export default App;
