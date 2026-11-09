import { getTotalByType } from '../services/storage';
import '../styles/Stats.css';

const Stats = () => {
  const income = getTotalByType('income');
  const expenses = getTotalByType('expense');
  const balance = Math.round((income - expenses) * 100) / 100;

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
    </section>
  );
};

export default Stats;
