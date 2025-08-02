import { useEffect, useState } from "react";

const Admin = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/issues")
      .then((res) => res.json())
      .then((data) => setIssues(data.reverse()));
  }, []);

  // 🛠️ 1. Yeh function me 'issue' ko argument lo
const handleStatusChange = async (e, issue) => {
  const newStatus = e.target.value;
  try {
    const res = await fetch(`http://localhost:5000/api/issues/update-status/${issue._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!res.ok) throw new Error("Status update failed");

    console.log("✅ Status updated successfully");
  } catch (error) {
    console.error("❌ Status update failed", error);
  }
};


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel - Manage Issues</h1>
      {issues.map((issue) => (
        <div key={issue._id} className="border p-4 mb-4 bg-white rounded shadow">
          <h2 className="text-xl">{issue.title}</h2>
          <p>{issue.description}</p>
          <p className="text-sm text-gray-500">Current Status: {issue.status}</p>

         <select
  value={issue.status}
  onChange={(e) => handleStatusChange(e, issue)}
  className="border px-2 py-1 rounded"
>
  <option value="Pending">Pending</option>
  <option value="In Progress">In Progress</option>
  <option value="Resolved">Resolved</option>
</select>
        </div>
      ))}
    </div>
  );
};

export default Admin;
