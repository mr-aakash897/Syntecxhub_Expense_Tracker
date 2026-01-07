import { useState, useEffect, useCallback, useMemo } from "react";
import ExpenseForm from "./components/ExpenseForm.jsx";
import ExpenseList from "./components/ExpenseList.jsx";
import "./styles/App.css";

const MOCK_API_DELAY = 900; // ms

function App() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock API fetch with setTimeout
  useEffect(() => {
    const timer = setTimeout(() => {
      const initialExpenses = [
        { id: 1, title: "Coffee with client", amount: 180 },
        { id: 2, title: "Domain renewal", amount: 950 },
        { id: 3, title: "Design assets", amount: 1499 },
      ];
      setExpenses(initialExpenses);
      setIsLoading(false);
    }, MOCK_API_DELAY);

    return () => clearTimeout(timer);
  }, []);

  // Stable add handler
  const handleAddExpense = useCallback((expenseData) => {
    setExpenses((prev) => [
      {
        id: Date.now(),
        title: expenseData.title,
        amount: Number(expenseData.amount),
      },
      ...prev,
    ]);
  }, []);

  // Memoized total
  const totalExpense = useMemo(() => {
    return expenses.reduce((sum, item) => sum + item.amount, 0);
  }, [expenses]);

  return (
    <div className="app-root">
      <div className="app-background-orbit" />
      <div className="app-background-orbit orbit-secondary" />

      <main className="app-shell">
        {/* App Title */}
        <header className="app-header">
          <h1 className="app-title">Expense Tracker</h1>
          <p className="app-subtitle">
            Track your expense for better future.
          </p>
        </header>

        {/* Expense Form */}
        <section className="card card-form">
          <h2 className="card-title">Add New Expense</h2>
          <p className="card-subtitle">
            Capture what you spend in just a couple of keystrokes.
          </p>
          <ExpenseForm onAddExpense={handleAddExpense} />
        </section>

        {/* Total Expense Summary */}
        <section className="card card-summary">
          <div className="summary-label">Total Spent</div>
          <div className="summary-value">
            ₹{totalExpense.toLocaleString("en-IN")}
          </div>
          <div className="summary-meta">
            {expenses.length === 0
              ? "No expenses yet. Your wallet is safe… for now."
              : `${expenses.length} expense${expenses.length > 1 ? "s" : ""} logged.`}
          </div>
        </section>

        {/* Expense List */}
        <section className="card card-list">
          <div className="card-list-header">
            <h2 className="card-title">Recent Expenses</h2>
            {isLoading && <span className="pill pill-loading">Fetching data…</span>}
          </div>

          <ExpenseList expenses={expenses} isLoading={isLoading} />
        </section>
      </main>
    </div>
  );
}

export default App;
