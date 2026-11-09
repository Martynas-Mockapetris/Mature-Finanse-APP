import { getTotalByType, getTransactions } from '../services/storage';
import '../styles/Stats.css';

const Stats = () => {
  const income = getTotalByType('income');
  const expenses = getTotalByType('expense');
  const balance = Math.round((income - expenses) * 100) / 100;
  const transactions = getTransactions();

  const incomeCount = transactions.filter((transaction) => transaction.type === 'income').length;

  const expenseCount = transactions.filter((transaction) => transaction.type === 'expense').length;

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  const monthStart = `${year}-${month}-01`;
  const todayString = `${year}-${month}-${day}`;

  const currentMonthTransactions = transactions.filter((transaction) => transaction.date >= monthStart && transaction.date <= todayString);

  const currentMonthIncomeCount = currentMonthTransactions.filter((transaction) => transaction.type === 'income').length;

  const currentMonthExpenseCount = currentMonthTransactions.filter((transaction) => transaction.type === 'expense').length;

  return (
    <section className="section">
      <h2 className="section-title-main">Statistics</h2>
      <p className="section-description">All-time summary</p>

      <div className="stats-grid">
        <article className="stats-card stats-card--income">
          <h3>Total Income</h3>
          <p>{income.toFixed(2)}</p>
        </article>

        <article className="stats-card stats-card--expense">
          <h3>Total Expenses</h3>
          <p>{expenses.toFixed(2)}</p>
        </article>

        <article className="stats-card stats-card--balance">
          <h3>Balance</h3>
          <p>{balance.toFixed(2)}</p>
        </article>
      </div>
      <h3 className="stats-subheading">All-time transaction counts</h3>
      <div className="stats-grid">
        <article className="stats-card">
          <h3>All Transactions</h3>
          <p>{transactions.length}</p>
        </article>
        <article className="stats-card stats-card--income">
          <h3>Income Transactions</h3>
          <p>{incomeCount}</p>
        </article>
        <article className="stats-card stats-card--expense">
          <h3>Expense Transactions</h3>
          <p>{expenseCount}</p>
        </article>
      </div>

      <h3 className="stats-subheading">Current month to date</h3>
      <div className="stats-grid">
        <article className="stats-card">
          <h3>All Transactions</h3>
          <p>{currentMonthTransactions.length}</p>
        </article>
        <article className="stats-card stats-card--income">
          <h3>Income Transactions</h3>
          <p>{currentMonthIncomeCount}</p>
        </article>
        <article className="stats-card stats-card--expense">
          <h3>Expense Transactions</h3>
          <p>{currentMonthExpenseCount}</p>
        </article>
      </div>
    </section>
  );
};

export default Stats;
