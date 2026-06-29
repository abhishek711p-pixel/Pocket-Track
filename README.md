# Expense Tracker (FinFlow)

![Expense Tracker UI](https://via.placeholder.com/800x400.png?text=Expense+Tracker+Dashboard)

A sleek, modern personal finance dashboard designed to help you track your daily income and expenses with ease. Features an intuitive glassmorphic interface that gives you real-time insights into your net balance and spending habits.

## 🌟 Features

- **Dashboard Overview**: Instantly view your net balance, total income, and total expenses.
- **Transaction Management**: Easily add new transactions (income or expense) with descriptions, amounts, and dates.
- **Glassmorphic UI**: A beautiful, modern frosted-glass design aesthetic.
- **Responsive Design**: Works perfectly across desktop and mobile devices.
- **User Authentication (Mock)**: A simple login overlay to personalize your dashboard.
- **Real-time Updates**: The balance and summary dynamically update as soon as you add a new transaction.

## 🚀 Tech Stack

- **HTML5**: For the structural layout and semantic elements.
- **CSS3**: Vanilla CSS utilizing Flexbox/Grid, CSS Variables, and backdrop-filter for the glassmorphism effect.
- **JavaScript (ES6+)**: Modular JS (`app.js`, `state.js`) for managing state and DOM manipulation.
- **Phosphor Icons**: Beautiful, clean iconography.
- **Google Fonts**: Uses the modern "Outfit" typeface.

## 📁 Project Structure

```text
expense-tracker/
├── index.html       # Main HTML file containing the app structure
├── css/
│   └── styles.css   # All styles including glassmorphic design system
└── js/
    ├── app.js       # Main application logic and event listeners
    └── state.js     # State management for transactions and user data
```

## 🛠️ Getting Started

To get a local copy up and running, follow these simple steps:

1. **Clone or Download** the repository to your local machine.
2. **Open the project folder**.
3. **Run the App**: Since this is a static frontend application, you can simply open `index.html` in your favorite web browser. 
   - *Optional:* For the best experience (especially when using ES6 modules), serve it using a local development server like VS Code's "Live Server" extension.

## 💡 How to Use

1. Enter any username on the login screen to access the dashboard.
2. View your current balance, income, and expenses on the left.
3. Fill out the "Add Transaction" form with a description, amount, date, and select whether it's an Income or Expense.
4. Click "Add Transaction" to see it instantly appear in your transaction list and update your total balance.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
