import axios from "axios";
import Account, { Task } from "../models/Account";

const baseUrl: string = import.meta.env.VITE_APP_BASE_URL ?? "NOT FOUND";

// get account by ID:
export const getAccountById = async (uid: string): Promise<Account | void> => {
  try {
    return (await axios.get(`${baseUrl}/accounts/${encodeURIComponent(uid)}`))
      .data;
  } catch (err) {
    console.log(err);
  }
};

// Create new account:
export const createNewAccount = async (account: Account): Promise<Account> => {
  return (await axios.post(`${baseUrl}/accounts`, account)).data;
};

// update account information (by ID):
export const updateAccountById = async (
  uid: string,
  account: Account
): Promise<Account | void> => {
  try {
    return (
      await axios.put(`${baseUrl}/accounts/${encodeURIComponent(uid)}`, account)
    ).data;
  } catch (err) {
    console.log(err);
  }
};

// Update tasklist:
export const addNewTask = async (uid: string, task: Task): Promise<Task> => {
  return (
    await axios.patch(
      `${baseUrl}/accounts/add-task/${encodeURIComponent(uid)}`,
      task
    )
  ).data;
};

export const updateTask = async (
  uid: string,
  uuid: string,
  updatedTask: Task
): Promise<Task | void> => {
  try {
    return (
      await axios.patch(
        `${baseUrl}/accounts/update-task/${encodeURIComponent(
          uuid
        )}/${encodeURIComponent(uid)}`,
        updatedTask
      )
    ).data;
  } catch (err) {
    console.log(err);
  }
};

// Delete task from tasklist:
export const removeTask = async (uuid: string, uid: string): Promise<void> => {
  try {
    return (
      await axios.patch(
        `${baseUrl}/accounts/delete-task/${encodeURIComponent(
          uuid
        )}/${encodeURIComponent(uid)}`
      )
    ).data;
  } catch (err) {
    console.log(err);
  }
};

// update box quantity:
export const updateBoxQuantity = async (
  uuid: string,
  newQuantity: number
): Promise<void> => {
  try {
    return (
      await axios.patch(
        `${baseUrl}/accounts/update-box-quantity/${encodeURIComponent(uuid)}`,
        { quantity: newQuantity }
      )
    ).data;
  } catch (err) {
    console.log(err);
  }
};

// Delete box from boxes array:
export const removeBox = async (uuid: string, uid: string): Promise<void> => {
  try {
    return (
      await axios.patch(
        `${baseUrl}/accounts/delete-box/${encodeURIComponent(
          uuid
        )}/${encodeURIComponent(uid)}`
      )
    ).data;
  } catch (err) {
    console.log(err);
  }
};
