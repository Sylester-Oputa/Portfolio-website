import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { CaseStudy } from "./pages/CaseStudy";
import { NotFound } from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import { ScrollToHash } from "./components/ScrollToHash";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Toaster />
      <BrowserRouter>
        <ScrollToHash />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
