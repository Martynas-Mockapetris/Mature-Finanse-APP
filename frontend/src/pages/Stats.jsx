import { useTransactions } from '../context/TransactionsContext';
import '../styles/Stats.css';

const Stats = () => {
  const { transactions, loading, error } = useTransactions();

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p>Transactions could not be loaded.</p>;

  const getTotalByType = (type) => {
    const total = transactions.filter((transaction) => transaction.type === type).reduce((sum, transaction) => sum + transaction.amount, 0);

    return Math.round(total * 100) / 100;
  };

  const income = getTotalByType('income');
  const expenses = getTotalByType('expense');
  const balance = Math.round((income - expenses) * 100) / 100;

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

  const previousMonthDate = new Date(year, today.getMonth() - 1, 1);
  const previousYear = previousMonthDate.getFullYear();
  const previousMonth = String(previousMonthDate.getMonth() + 1).padStart(2, '0');
  const previousMonthStart = `${previousYear}-${previousMonth}-01`;

  const previousMonthTransactions = transactions.filter((transaction) => transaction.date >= previousMonthStart && transaction.date < monthStart);

  const calculateNetSavings = (periodTransactions) => {
    const net = periodTransactions.reduce((sum, transaction) => {
      return transaction.type === 'income' ? sum + transaction.amount : sum - transaction.amount;
    }, 0);

    return Math.round(net * 100) / 100;
  };

  const currentSavings = calculateNetSavings(currentMonthTransactions);
  const previousSavings = calculateNetSavings(previousMonthTransactions);
  const savingsChange = Math.round((currentSavings - previousSavings) * 100) / 100;

  let savingsTrend;

  if (currentMonthTransactions.length === 0 || previousMonthTransactions.length === 0) {
    savingsTrend = 'Add transactions to both periods to see a comparison.';
  } else if (savingsChange > 0) {
    savingsTrend = `+ ${savingsChange.toFixed(2)}`;
  } else if (savingsChange < 0) {
    savingsTrend = `- ${Math.abs(savingsChange).toFixed(2)}`;
  } else {
    savingsTrend = 'No change';
  }

  return (
    <section className="section">
      {/* All-time summary */}
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

      {/* All-time transaction counts */}
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

      {/* Current month to date transaction counts */}
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

      {/* Savings comparison */}
      <h3 className="stats-subheading">Savings comparison</h3>
      <p className="section-description">Current month vs. Previous month.</p>
      <div className="stats-grid">
        <article className="stats-card stats-card--balance">
          <h3>Current Month Savings</h3>
          <p>{currentSavings.toFixed(2)}</p>
        </article>

        <article className="stats-card stats-card--balance">
          <h3>Previous Month Savings</h3>
          <p>{previousSavings.toFixed(2)}</p>
        </article>

        <article className="stats-card stats-card--balance">
          <h3>Savings Trend</h3>
          <p className="stats-trend">{savingsTrend}</p>
        </article>
      </div>
    </section>
  );
};

export default Stats;
