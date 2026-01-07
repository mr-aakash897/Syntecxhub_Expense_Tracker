function ExpenseItem({ title, amount }) {
  return (
    <li className="expense-item">
      <article className="expense-item-card">
        <div className="expense-main">
          <h3 className="expense-title">{title}</h3>
          <p className="expense-meta">Tracked in your personal ledger</p>
        </div>
        <div className="expense-amount-wrapper">
          <span className="expense-currency">₹</span>
          <span className="expense-amount">
            {Number(amount).toLocaleString("en-IN")}
          </span>
        </div>
      </article>
    </li>
  );
}

export default ExpenseItem;
