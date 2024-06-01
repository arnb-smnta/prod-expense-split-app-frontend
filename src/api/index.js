import axios from "axios";
import { LocalStorage } from "@/lib/helpers";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI,
  withCredentials: true,
  timeout: 120000,
});

apiClient.interceptors.request.use(
  function (config) {
    //Retrieve user token from local storage
    const token = LocalStorage.get("token");
    //Set authorization header with bearer token

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const loginUser = (data) => {
  return apiClient.post("/users/login", data);
};

const registerUser = (data) => {
  return apiClient.post("/users/register", data);
};

const logoutUser = () => {
  return apiClient.post("/users/logout");
};

const getAvailableUsers = () => {
  return apiClient.get("/expensegroup/availableUsers");
};

//Expense Group routes

const createANewGroup = (data) => {
  return apiClient.post("/expensegroup/creategroup", data);
};

const viewExpenseGroupDetails = (groupId) => {
  return apiClient.get(`/expensegroup/${groupId}`);
};

const editExpenseGroup = (data, groupId) => {
  return apiClient.patch(`/expensegroup/${groupId}`, data);
};

const deleteExpenseGroup = (groupId) => {
  return apiClient.delete(`/expensegroup/${groupId}`);
};

const getGroupBalanceSheet = (groupId) => {
  return apiClient.post(`/expensegroup/group-settlements/${groupId}`);
};

const makeSettlement = (groupId, data) => {
  return apiClient.post(`/expensegroup/makesettlement/${groupId}`, data);
};

const getUserExpenseGroups = () => {
  return apiClient.get("/expensegroup/");
};

const getUserSettlementRecords = () => {
  return apiClient.get("/expensegroup/settlements/user");
};

const getGroupSettlementRecords = (groupId) => {
  return apiClient.get(`/expensegroup/settlements/group/${groupId}`);
};

const addMembersinExpenseGroup = (groupId, userId) => {
  return apiClient.post(`/group/${groupId}/${userId}`);
};

//Expense Routes

const addExpense = (data, groupId, attachments) => {
  const formData = new FormData();

  formData.append("content", data); // ! has to modify before writting forntend after seeing the backend
  attachments.map((file) => {
    formData.append("attachments", file);
  });

  return apiClient.post(`/expense/addexpense/${groupId}`, formData);
};

const viewExpense = (expenseId) => {
  return apiClient.get(`/expense/${expenseId}`);
};

const editexpense = (expenseId, data) => {
  return apiClient.patch(`/expense/${expenseId}`, data);
};

const deleteExpense = (expenseId) => {
  return apiClient.delete(`/expense/${expenseId}`);
};

const viewExpensesInAGroup = (groupId) => {
  return apiClient.get(`/expense/group/${groupId}`);
};

const viewUserExpenses = () => {
  return apiClient.get(`/expense/user/expense`);
};

const viewUserRecentExpenses = () => {
  return apiClient.get("/expense/user/recentexpense");
};

const viewUserMonthlyExpense = () => {
  return apiClient.get("/expense/monthlyexpense/user");
};

const viewUserExpensesCategoryWise = () => {
  return apiClient.get("/expense/categoryexpense/user");
};

const viewUserExpensesDaily = () => {
  return apiClient.get("/expense/dailyExpense/user");
};

const viewGroupExpensesMonthly = (groupId) => {
  return apiClient.get(`/expense/monthlyexpense/group/${groupId}`);
};

const viewGroupExpensesDaily = (groupId) => {
  return apiClient.get(`/expense/dailyexpense/group/${groupId}`);
};

const viewGroupExpensesCategoryWise = (groupId) => {
  return apiClient.get(`/expense/categoryexpense/group/${groupId}`);
};

export {
  loginUser,
  registerUser,
  logoutUser,
  getAvailableUsers,
  createANewGroup,
  viewExpenseGroupDetails,
  editExpenseGroup,
  deleteExpenseGroup,
  getGroupBalanceSheet,
  makeSettlement,
  getUserExpenseGroups,
  getUserSettlementRecords,
  getGroupSettlementRecords,
  addMembersinExpenseGroup,
  addExpense,
  viewExpense,
  editexpense,
  deleteExpense,
  viewUserExpenses,
  viewExpensesInAGroup,
  viewUserExpensesCategoryWise,
  viewUserExpensesDaily,
  viewUserRecentExpenses,
  viewUserMonthlyExpense,
  viewGroupExpensesCategoryWise,
  viewGroupExpensesMonthly,
  viewGroupExpensesDaily,
};
