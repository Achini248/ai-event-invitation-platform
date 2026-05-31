import { Toaster } from 'react-hot-toast';
import { useTheme } from './hooks/useTheme';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import AgendaSection from './components/sections/AgendaSection';
import SpeakersSection from './components/sections/SpeakersSection';
import RegistrationForm from './components/sections/RegistrationForm';
import './styles/index.css';
import './styles/animations.css';

export default function App() {
  const { isDark, toggle } = useTheme();

  return (
    <div className="min-h-screen relative app-shell" style={{ background: 'var(--page-bg)', color: 'var(--text)' }}>
      {/* Page layout — navbar sits above z:2 content */}
      <Navbar isDark={isDark} toggleTheme={toggle} />

      <main>
        <HeroSection />
        <AboutSection />
        <AgendaSection />
        <SpeakersSection />
        <RegistrationForm />
      </main>

      <Footer />

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--card)',
            color: 'var(--text)',
            border: '1px solid var(--border)',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '14px',
            borderRadius: '12px',
          },
          success: { iconTheme: { primary: '#00d4ff', secondary: 'var(--surface)' } },
          error:   { iconTheme: { primary: '#f87171', secondary: 'var(--surface)' } },
        }}
      />
    </div>
  );
}
