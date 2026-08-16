import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "@/pages/landing/Landing";
import { TreeDetail } from "@/pages/tree-detail/TreeDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/trees/:id" element={<TreeDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
