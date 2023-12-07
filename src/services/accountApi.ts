import axios from "axios";
import Account from "../models/Account";

const baseUrl: string = import.meta.env.VITE_APP_BASE_URL ?? "NOT FOUND";

export const getAccountById = async (uid: string): Promise<Account> => {
  return (await axios.get(`${baseUrl}/accounts/${encodeURIComponent(uid)}`))
    .data;
};

export const createNewAccount = async (account: Account): Promise<Account> => {
  return (await axios.post(`${baseUrl}/accounts`, account)).data;
};
