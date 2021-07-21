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
};
