import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { SharePage } from "./pages/SharePage";
import { SignPage } from "./pages/SignPage";

const App = () => (
  <>
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/share/:shareId" element={<SharePage />} />
        <Route path="/sign/:shareId" element={<SignPage />} />
      </Routes>
    </BrowserRouter>
  </>
);

export default App;
