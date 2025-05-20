import { Link } from "react-router-dom";
import { useState } from "react";

const Home = ({ tasks, setTasks }) => {
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (confirmed) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }
  };

  const [statusFilter, setStatusFilter] = useState("All");

  const filteredTasks = tasks.filter((task) => {
    if (statusFilter === "All") return true;
    return task.status === statusFilter;
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        All Tasks
      </h1>

      <div className="flex justify-end mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <table className="w-full table-auto border border-gray-300">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="border px-4 py-2">S.No</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredTasks.map((task, index) => (
            <tr key={task.id} className="text-center">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{task.title}</td>
              <td
                className={`border px-4 py-2 font-semibold ${
                  task.status === "Completed"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {task.status}
              </td>
              <td className="border px-4 py-2 space-x-2">
                <Link
                  to={`/edit/${task.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {filteredTasks.length === 0 && (
            <tr>
              <td colSpan="4" className="text-gray-500 py-4 text-center">
                No tasks to display.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;