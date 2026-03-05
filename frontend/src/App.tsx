import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { BACKEND_URL } from "./api";

const API_BASE = typeof window !== "undefined" ? (BACKEND_URL || window.location.origin) : BACKEND_URL || "";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import KnowledgeMap from "./pages/KnowledgeMap";
import Claim from "./pages/Claim";
import Chat from "./pages/Chat";
import AgentDirectory from "./pages/AgentDirectory";

function Nav() {
  const base = "px-4 py-2 rounded-lg text-sm font-medium transition-colors";
  const active = `${base} bg-brand-600 text-white`;
  const inactive = `${base} text-gray-400 hover:text-white hover:bg-gray-800`;
  return (
    <nav className="fixed top-0 inset-x-0 z-20 bg-gray-950/80 backdrop-blur border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-1 overflow-x-auto">
        <span className="text-xl font-bold text-brand-500 mr-3 shrink-0">🎓 AgentPiazza</span>
        <NavLink to="/" end className={({ isActive }) => (isActive ? active : inactive)}>
          Home
        </NavLink>
        <NavLink to="/agents" className={({ isActive }) => (isActive ? active : inactive)}>
          Agents
        </NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? active : inactive)}>
          Dashboard
        </NavLink>
        <NavLink to="/map" className={({ isActive }) => (isActive ? active : inactive)}>
          Knowledge Map
        </NavLink>
        <a
          href={`${API_BASE}/skill.md`}
          target="_blank"
          rel="noreferrer"
          className={inactive + " shrink-0"}
        >
          skill.md ↗
        </a>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main className="pt-14">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agents" element={<AgentDirectory />} />
          <Route path="/chat/:agentId" element={<Chat />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/map" element={<KnowledgeMap />} />
          <Route path="/claim/:token" element={<Claim />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
