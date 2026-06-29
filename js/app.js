// app.js
import { setCurrentUser, addTransaction, deleteTransaction } from './state.js?v=2';
import { updateDashboard, renderTransactions, showError, hideError, clearForm, showLogin, showDashboard } from './ui.js?v=2';

// DOM Elements
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const btnLogout = document.getElementById('btn-logout');

const formEl = document.getElementById('transaction-form');
const descInput = document.getElementById('desc');
const amountInput = document.getElementById('amount');
const dateInput = document.getElementById('date');
const typeInput = document.getElementById('type');

// Run with view transition if supported
const renderWithTransition = (callback) => {
  if (!document.startViewTransition) {
    callback();
    return;
  }
  document.startViewTransition(() => {
    callback();
  });
};

// Handle Delete
const handleDelete = (id) => {
  deleteTransaction(id);
  renderWithTransition(updateUI);
};

// Update entire UI
const updateUI = () => {
  updateDashboard();
  renderTransactions(handleDelete);
};

// Authentication Flow
const handleLogin = (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  if (!username) return;

  // Set user, save to session, and load data
  setCurrentUser(username);
  sessionStorage.setItem('active_user', username);
  
  // Transition UI
  renderWithTransition(() => {
    showDashboard();
    updateUI();
  });
  
  usernameInput.value = '';
};

const handleLogout = () => {
  sessionStorage.removeItem('active_user');
  renderWithTransition(() => {
    showLogin();
  });
};

// Init application
const init = () => {
  // Check if someone is already logged in
  const activeUser = sessionStorage.getItem('active_user');
  if (activeUser) {
    setCurrentUser(activeUser);
    showDashboard();
    updateUI();
  } else {
    showLogin();
  }

  // Set default date for form
  dateInput.valueAsDate = new Date();
};

// Event Listeners
loginForm.addEventListener('submit', handleLogin);
btnLogout.addEventListener('click', handleLogout);

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  hideError();

  const desc = descInput.value.trim();
  const amountStr = amountInput.value.trim();
  const date = dateInput.value;
  const type = typeInput.value;

  // Validation
  if (!desc || !amountStr || !date || !type) {
    showError('Please fill in all fields.');
    return;
  }

  const amount = parseFloat(amountStr);
  if (isNaN(amount) || amount <= 0) {
    showError('Please enter a valid amount greater than 0.');
    return;
  }

  // Create transaction object
  const transaction = {
    description: desc,
    amount: amount,
    date: date,
    type: type
  };

  // Update state and UI with smooth transition
  addTransaction(transaction);
  renderWithTransition(updateUI);
  
  // Clear form
  clearForm(formEl);
  descInput.focus();
});

// Run init
document.addEventListener('DOMContentLoaded', init);
