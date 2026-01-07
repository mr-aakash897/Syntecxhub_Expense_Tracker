import ExpenseItem from "./ExpenseItem.jsx";

function ExpenseList({ expenses, isLoading }) {
  if (isLoading) {
    return (
      <div className="list-placeholder">
        <div className="skeleton-row" />
        <div className="skeleton-row" />
        <div className="skeleton-row" />
      </div>
    );
  }

  if (!expenses || expenses.length === 0) {
    return (
      <p className="list-empty">
        No expenses yet. Add your first one above to light up this list.
      </p>
    );
  }

  return (
    <ul className="expense-list" aria-label="Expense history">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          title={expense.title}
          amount={expense.amount}
        />
      ))}
    </ul>
  );
}

export default ExpenseList;
