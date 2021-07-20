export default {
  saveExpense: () => {
    return {
      url: `/expense`,
      method: 'post',
    }
  },
  editExpense: (expenseId) => {
    return {
      url: `/expense/${expenseId}`,
      method: 'put',
    }
  },
  getAllExpense: (userId) => {
    return {
      url: `/expense/${userId}`,
      method: 'get',
    }
  },
  deleteExpense: (expenseId) => {
    return {
      url: `/expense/${expenseId}`,
      method: 'delete',
    }
  },
  getAllExpenseCategory: (userId) => {
    return {
      url: `/expense/getAllExpenseCategory/${userId}`,
      method: 'get',
    }
  },
  createExpenseCategory: () => {
    return {
      url: `expense/createExpenseCategory`,
      method: 'post',
    }
  },
  registerUser: () => {
    return {
      url: 'users/register',
      method: 'post',
    }
  },
  loginUserWithPassword: () => {
    return {
      url: 'users/login/password',
      method: 'post',
    }
  },
  loginUserWithOtp: () => {
    return {
      url: 'users/login/otp',
      method: 'post',
    }
  },
  verifyOtpLogin: () => {
    return {
      url: 'users/login/verifyotp',
      method: 'post',
    }
  },
  forgotPasswrdSendOtp: () => {
    return {
      url: 'users/forgotpassword/otp',
      method: 'post',
    }
  },
  verifyOtpForgotPassword: () => {
    return {
      url: 'users/forgotpassword/verifyotp',
      method: 'post',
    }
  },
  forgotPasswrdReset: () => {
    return {
      url: 'users/forgotpassword/passwordReset',
      method: 'post',
    }
  },
  emiCalculate: () => {
    return {
      url: `emicalculator/emicalculate`,
      method: 'get',
    }
  },
}
