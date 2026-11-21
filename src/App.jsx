import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "@/pages/landing/Landing";
import { TreeDetail } from "@/pages/tree-detail/TreeDetail";
import { I18nProvider } from "@/i18n/i18n";

function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/trees/:id" element={<TreeDetail />} />
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  );
}

export default App;
