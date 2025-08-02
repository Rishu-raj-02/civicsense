import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Report from "./components/Report";
import Feed from "./components/Feed";
import Details from "./components/Details";
import Admin from "./components/Admin";
import Navbar from "./components/Navbar";
import ViewIssues from './components/ViewIssues';

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<Report />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/issues" element={<ViewIssues />} />
      </Routes>
    </div>
  );
}

export default App;
