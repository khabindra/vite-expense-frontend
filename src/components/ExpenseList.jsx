import { useState, useEffect } from "react";
import axios from "axios";
import ExpenseForm from "./ExpenseForm";
import { FaArrowLeft, FaArrowRight, FaEdit, FaTrashAlt } from "react-icons/fa";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [pagination, setPagination] = useState({ next: null, previous: null });
  const [editingExpense, setEditingExpense] = useState(null);
  const [currentUrl, setCurrentUrl] = useState(
    "http://localhost:8000/api/expenses/"
  );

  const fetchExpenses = async (url = currentUrl) => {
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      setExpenses(res.data.results);
      setPagination({ next: res.data.next, previous: res.data.previous });
      setCurrentUrl(url); // update current URL for next/prev use
    } catch {
      alert("Failed to fetch expenses");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/expenses/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      fetchExpenses(currentUrl);
    } catch {
      alert("Failed to delete");
    }
  };

  const handleEdit = (exp) => setEditingExpense(exp);
  const clearEdit = () => setEditingExpense(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md space-y-6">
      {/* Heading */}
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-4">
        Expense List
      </h2>

      {/* Expense Form */}
      <ExpenseForm
        onSuccess={() => fetchExpenses(currentUrl)}
        editingExpense={editingExpense}
        clearEdit={clearEdit}
      />

      {/* Expenses List */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Title
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Amount
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Type
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Total
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {expenses.length > 0 ? (
              expenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2 text-gray-700 font-medium">
                    {exp.title}
                  </td>
                  <td className="px-4 py-2 text-gray-700">{exp.amount}</td>
                  <td className="px-4 py-2 text-gray-700 capitalize">
                    {exp.transaction_type}
                  </td>
                  <td className="px-4 py-2 text-gray-700">{exp.total}</td>
                  <td className="px-4 py-2 flex justify-center space-x-3">
                    {/* Edit Button */}
                    <button
                      onClick={() => handleEdit(exp)}
                      className="p-2 text-blue-500 hover:bg-blue-100 rounded-full transition"
                      title="Edit"
                    >
                      <FaEdit className="w-5 h-5" />
                    </button>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(exp.id)}
                      className="p-2 text-red-500 hover:bg-red-100 rounded-full transition"
                      title="Delete"
                    >
                      <FaTrashAlt className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No expenses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center items-center space-x-4 mt-4">
        {pagination.previous && (
          <button
            onClick={() => fetchExpenses(pagination.previous)}
            className="flex items-center px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!pagination.previous}
          >
            <FaArrowLeft className="w-4 h-4 mr-2" /> Prev
          </button>
        )}
        {pagination.next && (
          <button
            onClick={() => fetchExpenses(pagination.next)}
            className="flex items-center px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!pagination.next}
          >
            Next <FaArrowRight className="w-4 h-4 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
