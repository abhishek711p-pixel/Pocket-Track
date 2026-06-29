// ui.js
import { getTransactions, getTotals, getCurrentUser } from './state.js?v=2';

// DOM Elements
const loginOverlay = document.getElementById('login-overlay');
const mainApp = document.getElementById('main-app');
const headerUsername = document.getElementById('header-username');

const balanceEl = document.getElementById('net-balance');
const incomeEl = document.getElementById('total-income');
const expenseEl = document.getElementById('total-expense');
const listEl = document.getElementById('transaction-list');
const emptyStateEl = document.getElementById('empty-state');
const errorToastEl = document.getElementById('form-error');
const errorTextEl = document.getElementById('error-text');
const ratioBarFill = document.getElementById('ratio-bar-fill');

// View management
export const showLogin = () => {
  loginOverlay.classList.remove('hidden');
  mainApp.classList.add('hidden');
};

export const showDashboard = () => {
  loginOverlay.classList.add('hidden');
  mainApp.classList.remove('hidden');
  // Update header text
  const username = getCurrentUser();
  headerUsername.innerText = `${username.charAt(0).toUpperCase() + username.slice(1)}'s Tracker`;
};

// Format money
const formatMoney = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(Math.abs(amount));
};

// Format date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Update Dashboard
export const updateDashboard = () => {
  const { totalIncome, totalExpense, netBalance } = getTotals();

  balanceEl.innerText = `${netBalance < 0 ? '-' : ''}${formatMoney(netBalance)}`;
  incomeEl.innerText = `+${formatMoney(totalIncome)}`;
  expenseEl.innerText = `-${formatMoney(totalExpense)}`;

  // Update Ratio Bar
  const totalSum = totalIncome + totalExpense;
  if (totalSum === 0) {
    ratioBarFill.style.width = '50%'; // Neutral starting point
  } else {
    const incomePercentage = (totalIncome / totalSum) * 100;
    ratioBarFill.style.width = `${incomePercentage}%`;
  }
};

// Render Transaction List
export const renderTransactions = (onDelete) => {
  const transactions = getTransactions();
  listEl.innerHTML = '';

  if (transactions.length === 0) {
    emptyStateEl.classList.add('visible');
  } else {
    emptyStateEl.classList.remove('visible');
    
    transactions.forEach(transaction => {
      const sign = transaction.type === 'income' ? '+' : '-';
      
      const li = document.createElement('li');
      li.classList.add('transaction-item', transaction.type);
      // Give each item a unique view transition name to animate specifically
      li.style.viewTransitionName = `transaction-${transaction.id}`;

      li.innerHTML = `
        <div class="transaction-info">
          <span class="transaction-desc">${transaction.description}</span>
          <span class="transaction-date"><i class="ph ph-calendar-blank"></i> ${formatDate(transaction.date)}</span>
        </div>
        <div class="transaction-actions">
          <span class="transaction-amount ${transaction.type}">${sign}${formatMoney(transaction.amount)}</span>
          <button class="btn-delete" data-id="${transaction.id}" aria-label="Delete">
            <i class="ph ph-trash"></i>
          </button>
        </div>
      `;
      
      // Attach delete event listener
      const deleteBtn = li.querySelector('.btn-delete');
      deleteBtn.addEventListener('click', () => onDelete(transaction.id));
      
      listEl.appendChild(li);
    });
  }
};

// Show Error Toast
export const showError = (message) => {
  errorTextEl.innerText = message;
  errorToastEl.classList.add('visible');
};

// Hide Error Toast
export const hideError = () => {
  errorTextEl.innerText = '';
  errorToastEl.classList.remove('visible');
};

// Clear Form Inputs
export const clearForm = (formEl) => {
  formEl.reset();
  // Set default date to today
  formEl.querySelector('#date').valueAsDate = new Date();
};
