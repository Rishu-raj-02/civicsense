import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-blue-600">CivicTrack</h1>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
        <Link to="/report" className="text-gray-700 hover:text-blue-600">Report</Link>
        <Link to="/feed" className="text-gray-700 hover:text-blue-600">Feed</Link>
        <Link to="/admin" className="text-gray-700 hover:text-blue-600">Admin</Link>
        <Link to="/issues" className="text-gray-700 hover:text-blue-600 font-medium">View Issues</Link>
      </div>
    </nav>
  );
};

export default Navbar;
