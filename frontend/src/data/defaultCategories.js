import { GiShoppingCart, GiReceiveMoney, GiTakeMyMoney, GiPartyPopper, GiBriefcase, GiMoneyStack, GiDiamonds, GiStockpiles } from 'react-icons/gi';

export const defaultExpenseCategories = [
  { id: 'expense-bills', icon: GiReceiveMoney, name: 'Bills' },
  { id: 'expense-groceries', icon: GiShoppingCart, name: 'Groceries' },
  { id: 'expense-subscriptions', icon: GiTakeMyMoney, name: 'Subscriptions' },
  { id: 'expense-entertainment', icon: GiPartyPopper, name: 'Entertainment' }
];

export const defaultIncomeCategories = [
  { id: 'income-work', icon: GiBriefcase, name: 'Work' },
  { id: 'income-freelance', icon: GiMoneyStack, name: 'Freelance' },
  { id: 'income-dividends', icon: GiDiamonds, name: 'Dividends' },
  { id: 'income-stocks', icon: GiStockpiles, name: 'Stocks' }
];
