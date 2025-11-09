import { useEffect, useState } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index";
import { SharePage } from "./pages/SharePage";
import { SignPage } from "./pages/SignPage";
import supabase from "@/integrations/supabase/client";

const App = () => {
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        await supabase.auth.signInAnonymously();
      }
      setAuthReady(true);
    };

    initAuth();
  }, []);

  if (!authReady) {
    return null;
  }

  return (
    <>
      <Sonner />
      <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/share/:shareId" element={<SharePage />} />
          <Route path="/sign/:shareId" element={<SignPage />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </>
  );
};

export default App;
