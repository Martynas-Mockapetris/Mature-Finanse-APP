import { getTransactionsByType, findCategory } from '../services/storage';
import '../styles/TransactionList.css';

const TransactionList = ({ type }) => {
  const transactions = getTransactionsByType(type).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <ul className="transaction-list">
      <li className="transaction-item--header">
        <span className="transaction-date-header">Date</span>
        <span className="transaction-category-header">Category</span>
        <span className="transaction-note-header">Note</span>
        <span className="transaction-amount-header">Amount</span>
      </li>
      {transactions.map((transaction) => (
        <li key={transaction.id} className={`transaction-item transaction-item--${type}`}>
          <span className="transaction-date">{transaction.date}</span>
          <span className="transaction-category">{findCategory(type, transaction.categoryId)?.name ?? 'Unknown category'}</span>
          <span className="transaction-note">{transaction.note}</span>
          <span className="transaction-amount">{transaction.amount.toFixed(2)}</span>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
