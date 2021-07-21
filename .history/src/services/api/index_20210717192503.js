// eslint-disable-next-line import/no-anonymous-default-export
export default {
  saveExpense: () => {
    return {
      url: `/expense`,
      method: "post",
    };
  },
  editExpense: (expenseId) => {
    return {
      url: `/expense/${expenseId}`,
      method: "put",
    };
  },
  getAllExpense: (userId) => {
    return {
      url: `/expense/${userId}`,
      method: "get",
    };
  },
  deleteExpense: (expenseId) => {
    return {
      url: `/expense/${expenseId}`,
      method: "delete",
    };
  },
  getAllExpenseCategory: (userId) => {
    return {
      url: `/expense/getAllExpenseCategory/${userId}`,
      method: "get",
    };
  },
  createExpenseCategory: () => {
    return {
      url: `expense/createExpenseCategory`,
      method: "post",
    };
  },
  saveIncome: () => {
    return {
      url: `/income`,
      method: "post",
    };
  },
  editIncome: (incomeId) => {
    return {
      url: `/income/${incomeId}`,
      method: "put",
    };
  },
  getAllIncome: (userId) => {
    return {
      url: `/income/${userId}`,
      method: "get",
    };
  },
  deleteIncome: (incomeId) => {
    return {
      url: `/income/${incomeId}`,
      method: "delete",
    };
  },
  getAllIncomeCategory: (userId) => {
    return {
      url: `/income/getAllIncomeCategory/${userId}`,
      method: "get",
    };
  },
  createIncomeCategory: () => {
    return {
      url: `income/createIncomeCategory`,
      method: "post",
    };
  },

  getAllExpensesTotal: (userId) => {
    return {
      url: `/dashboard/expensesTotal/${userId}`,
      method: "get",
    };
  },
  getAllIncomesTotal: (userId) => {
    return {
      url: `/dashboard/incomesTotal/${userId}`,
      method: "get",
    };
  },
  getSavings: (userId) => {
    return {
      url: `/dashboard/savings/${userId}`,
      method: "get",
    };
  },
  getIncomesDashboard: (userId) => {
    return {
      url: `/dashboard/incomes/${userId}`,
      method: "get",
    };
  },
  getExpensesDashboard: (userId) => {
    return {
      url: `/dashboard/expenses/${userId}`,
      method: "get",
    };
  },
};
