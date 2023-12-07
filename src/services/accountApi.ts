import axios from "axios";
import Account from "../models/Account";

const baseUrl: string = import.meta.env.VITE_APP_BASE_URL ?? "NOT FOUND";

export const getAccountById = async (uid: string): Promise<Account | void> => {
  try {
    return (await axios.get(`${baseUrl}/accounts/${encodeURIComponent(uid)}`))
      .data;
  } catch (err) {
    console.log(err);
  }
};

export const createNewAccount = async (account: Account): Promise<Account> => {
  return (await axios.post(`${baseUrl}/accounts`, account)).data;
};
