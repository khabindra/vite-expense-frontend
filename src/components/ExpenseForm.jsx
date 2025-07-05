import { useState, useEffect } from "react";
import axios from "axios";

const ExpenseForm = ({ onSuccess, editingExpense, clearEdit }) => {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    transaction_type: "debit",
    tax: 0,
    tax_type: "flat",
  });

  // Populate form when editingExpense changes
  useEffect(() => {
    if (editingExpense) {
      setForm({
        title: editingExpense.title,
        amount: editingExpense.amount,
        transaction_type: editingExpense.transaction_type,
        tax: editingExpense.tax,
        tax_type: editingExpense.tax_type,
      });
    } else {
      // Reset form when not editing
      setForm({
        title: "",
        amount: "",
        transaction_type: "debit",
        tax: 0,
        tax_type: "flat",
      });
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access");
    try {
      if (editingExpense) {
        // Update existing expense
        await axios.put(
          `http://127.0.0.1:8000/api/expenses/${editingExpense.id}/`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        clearEdit();
      } else {
        // Create new expense
        await axios.post("http://127.0.0.1:8000/api/expenses/", form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      onSuccess();
      // Reset form after submit
      setForm({
        title: "",
        amount: "",
        transaction_type: "debit",
        tax: 0,
        tax_type: "flat",
      });
    } catch {
      alert("Error in saving expense");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h3 className="text-2xl font-semibold mb-4 text-center text-gray-700">
        {editingExpense ? "Edit Expense" : "Add Expense"}
      </h3>

      {/* Title */}
      <div>
        <label className="block mb-1 text-gray-600 font-medium" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
        />
      </div>

      {/* Amount */}
      <div>
        <label
          className="block mb-1 text-gray-600 font-medium"
          htmlFor="amount"
        >
          Amount
        </label>
        <input
          id="amount"
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
        />
      </div>

      {/* Transaction Type */}
      <div>
        <label
          className="block mb-1 text-gray-600 font-medium"
          htmlFor="transaction_type"
        >
          Transaction Type
        </label>
        <select
          id="transaction_type"
          name="transaction_type"
          value={form.transaction_type}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
        >
          <option value="debit">Debit</option>
          <option value="credit">Credit</option>
        </select>
      </div>

      {/* Tax */}
      <div>
        <label className="block mb-1 text-gray-600 font-medium" htmlFor="tax">
          Tax
        </label>
        <input
          id="tax"
          name="tax"
          type="number"
          value={form.tax}
          onChange={handleChange}
          placeholder="Tax"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
        />
      </div>

      {/* Tax Type */}
      <div>
        <label
          className="block mb-1 text-gray-600 font-medium"
          htmlFor="tax_type"
        >
          Tax Type
        </label>
        <select
          id="tax_type"
          name="tax_type"
          value={form.tax_type}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
        >
          <option value="flat">Flat</option>
          <option value="percentage">Percentage</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex justify-center space-x-4 mt-4">
        <button
          type="submit"
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          {editingExpense ? "Update" : "Submit"}
        </button>
        {editingExpense && (
          <button
            type="button"
            onClick={clearEdit}
            className="flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-semibold transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ExpenseForm;
