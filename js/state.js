// state.js

// Current active user
export let currentUser = null;

// State array
let transactions = [];

// Get dynamic storage key based on user
const getStorageKey = () => `expense_tracker_${currentUser}`;

export const setCurrentUser = (username) => {
  currentUser = username.trim().toLowerCase();
  loadTransactions();
};

export const getCurrentUser = () => currentUser;

// Initialize state from localStorage
export const loadTransactions = () => {
  if (!currentUser) return;
  const stored = localStorage.getItem(getStorageKey());
  if (stored) {
    try {
      transactions = JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse transactions from localStorage', e);
      transactions = [];
    }
  } else {
    // Zero state for new users
    transactions = [];
  }
  return transactions;
};

// Save state to localStorage
const saveTransactions = () => {
  if (!currentUser) return;
  localStorage.setItem(getStorageKey(), JSON.stringify(transactions));
};

// Add a transaction
export const addTransaction = (transaction) => {
  transactions.push({
    ...transaction,
    id: Date.now().toString(),
  });
  saveTransactions();
};

// Delete a transaction
export const deleteTransaction = (id) => {
  transactions = transactions.filter(t => t.id !== id);
  saveTransactions();
};

// Get all transactions
export const getTransactions = () => {
  // Sort by date descending
  return [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Calculate totals using reduce() and filter()
export const getTotals = () => {
  const incomeTransactions = transactions.filter(t => t.type === 'income');
  const expenseTransactions = transactions.filter(t => t.type === 'expense');

  const totalIncome = incomeTransactions.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = expenseTransactions.reduce((acc, curr) => acc + curr.amount, 0);
  const netBalance = totalIncome - totalExpense;

  return {
    totalIncome,
    totalExpense,
    netBalance
  };
};
