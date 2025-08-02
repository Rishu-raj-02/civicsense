import { useEffect, useState } from "react";

const ViewIssues = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/issues")
      .then((res) => res.json())
      .then((data) => {
        console.log("📦 Issues fetched:", data);
        setIssues(data);
      })
      .catch((err) => console.error("❌ Fetch error:", err));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Reported Issues</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {issues.map((issue) => (
          <div
            key={issue._id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <img
              src={issue.images[0]}
              alt="issue"
              className="h-48 w-full object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-3">{issue.title}</h2>
            <p className="text-gray-600 text-sm">{issue.description}</p>
            <div className="mt-2 text-sm text-gray-500">
              <span>Category: {issue.category}</span> <br />
              <span>Date: {new Date(issue.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewIssues;
