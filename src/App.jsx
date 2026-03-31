import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieDetailsModal from "./pages/MovieDetailsModal";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movie/:id" element={<MovieDetailsModal />} />
    </Routes>
  );
}
