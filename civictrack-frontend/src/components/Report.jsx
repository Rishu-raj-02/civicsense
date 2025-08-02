import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  "Roads",
  "Lighting",
  "Water Supply",
  "Cleanliness",
  "Public Safety",
  "Obstructions",
];
<Link to="/issues" className="text-blue-600 underline mt-4 block">
  View All Reported Issues
</Link>

const Report = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    anonymous: false,
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else if (type === "file") {
      setForm({ ...form, images: [...files].slice(0, 5) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const uploadedImageUrls = [];

    for (const image of form.images) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "civicktrack_upload");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dsbyyiecf/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const file = await res.json();

      if (!file.secure_url) {
        throw new Error("Upload failed: " + JSON.stringify(file));
      }

      uploadedImageUrls.push(file.secure_url);
    }

    // ✅ Step 1: Prepare final data
    const finalIssueData = {
      title: form.title,
      description: form.description,
      category: form.category,
      anonymous: form.anonymous,
      images: uploadedImageUrls,
      createdAt: new Date().toISOString(),
    };

    console.log("🚀 Final Data Ready to Send:", finalIssueData);

    // ✅ Step 2: Send to backend
    await fetch("http://localhost:5000/api/issues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalIssueData),
    });

    alert("✅ Issue submitted to backend!");

  } catch (err) {
    console.error("❌ Upload Error:", err);
    alert("Something went wrong.");
  }
};

  

  return (
    <motion.div
      className="max-w-xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-md"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Report an Issue</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Issue Title"
          className="w-full p-3 border rounded-md"
          onChange={handleChange}
          value={form.title}
          required
        />

        <textarea
          name="description"
          placeholder="Short description..."
          className="w-full p-3 border rounded-md"
          rows="4"
          onChange={handleChange}
          value={form.description}
          required
        ></textarea>

        <select
          name="category"
          className="w-full p-3 border rounded-md"
          onChange={handleChange}
          value={form.category}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <div>
          <label className="block mb-1 font-medium">Upload Images (max 5):</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="anonymous"
            checked={form.anonymous}
            onChange={handleChange}
          />
          Post Anonymously
        </label>

        <motion.button
          whileHover={{ scale: 1.05 }}
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700"
        >
          Submit Issue
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Report;
