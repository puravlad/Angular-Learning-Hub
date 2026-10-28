import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Topics from "./pages/Topics";
import Quiz from "./pages/Quiz";
import TopicDetail from "./pages/TopicDetails";
import AdminDashboard from "./pages/AdminDashboard";
import AdminContent from "./pages/AdminContent";

import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/topics/:topicId" element={<TopicDetail />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin-content" element={<AdminContent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;