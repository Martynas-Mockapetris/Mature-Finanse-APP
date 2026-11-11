import { Link } from 'react-router-dom';
import { useCategories } from '../context/CategoriesContext';
import { FaTrash, FaPen } from 'react-icons/fa';
import '../styles/TransactionList.css';

const TransactionList = ({ type, transactions, onDelete, readOnly = false, showEdit = true }) => {
  const { findCategory } = useCategories();
  const sorted = [...transactions].sort((a, b) => b.date.localeCompare(a.date));

  if (transactions.length === 0) {
    return <p className="transaction-empty">{type === 'all' ? 'No transactions yet.' : `No ${type} transactions yet.`}</p>;
  }

  return (
    <ul className="transaction-list">
      <li className="transaction-item--header">
        <span className="transaction-date-header">Date</span>
        <span className="transaction-category-header">Category</span>
        <span className="transaction-note-header">Note</span>
        <span className="transaction-amount-header">Amount</span>
        <span></span>
      </li>
      {sorted.map((transaction) => (
        <li key={transaction.id} className={`transaction-item transaction-item--${transaction.type}`}>
          <span className="transaction-date">{transaction.date}</span>
          <span className="transaction-category">{findCategory(transaction.type, transaction.categoryId)?.name ?? 'Unknown category'}</span>
          <span className="transaction-note">{transaction.note}</span>
          <span className="transaction-amount">{transaction.amount.toFixed(2)}</span>
          {!readOnly && (
            <div className="transaction-actions">
              {showEdit && (
                <Link to={`/transactions/${transaction.id}/edit`} className="transaction-edit" aria-label="Edit transaction" title="Edit">
                  <FaPen />
                </Link>
              )}
              <button className="transaction-delete" onClick={() => onDelete(transaction.id)} aria-label="Delete transaction" title="Delete">
                <FaTrash />
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
