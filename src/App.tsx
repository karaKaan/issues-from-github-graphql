import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Issue from "./pages/Issue";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="issue/:id" element={<Issue />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
