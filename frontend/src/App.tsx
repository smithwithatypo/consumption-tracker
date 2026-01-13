import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Entry from './pages/Entry';
import { ConsumptionProvider } from './contexts/ConsumptionContext';
import { ThemeProvider } from "@/components/ui/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ConsumptionProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Entry />} />
          </Routes>
        </BrowserRouter>
      </ConsumptionProvider>
    </ThemeProvider>
  );
}

export default App;
