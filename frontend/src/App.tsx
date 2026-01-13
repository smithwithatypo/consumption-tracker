import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Entry from './pages/Entry';
import { JobProvider } from '@/contexts/JobContext';
import { ThemeProvider } from "@/components/ui/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <JobProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Entry />} />
          </Routes>
        </BrowserRouter>
      </JobProvider>
    </ThemeProvider>
  );
}

export default App;
