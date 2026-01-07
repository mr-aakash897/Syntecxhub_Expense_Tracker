import { useState, useRef, useEffect } from "react";

function ExpenseForm({ onAddExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState({});
  const titleInputRef = useRef(null);

  // Auto-focus title on mount
  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  const validate = () => {
    const nextErrors = {};

    if (!title.trim()) {
      nextErrors.title = "Title cannot be empty.";
    }

    const numericAmount = Number(amount);
    if (!amount || Number.isNaN(numericAmount) || numericAmount <= 0) {
      nextErrors.amount = "Amount must be greater than 0.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) return;

    onAddExpense({
      title: title.trim(),
      amount: Number(amount),
    });

    // Clear fields after submit
    setTitle("");
    setAmount("");
    setErrors({});

    // Return focus to title
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="expense-title" className="form-label">
            Expense title
          </label>
          <input
            id="expense-title"
            ref={titleInputRef}
            type="text"
            className={`form-input ${
              errors.title ? "form-input-error" : ""
            }`}
            placeholder="e.g. Figma subscription"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && (
            <p className="form-error" aria-live="polite">
              {errors.title}
            </p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="expense-amount" className="form-label">
            Amount (₹)
          </label>
          <input
            id="expense-amount"
            type="number"
            min="0"
            step="1"
            className={`form-input ${
              errors.amount ? "form-input-error" : ""
            }`}
            placeholder="e.g. 499"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {errors.amount && (
            <p className="form-error" aria-live="polite">
              {errors.amount}
            </p>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          <span className="btn-glow" />
          <span className="btn-label">Add expense</span>
        </button>
      </div>
    </form>
  );
}

export default ExpenseForm;
