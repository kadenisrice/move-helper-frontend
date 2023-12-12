import axios from "axios";
import Tip from "../models/Tip";

// importing base URL from .env.local file
const baseUrl: string = import.meta.env.VITE_APP_BASE_URL ?? "";

// get all tips:
export const getAllTips = (): Promise<Tip[]> => {
  return axios.get(`${baseUrl}/community/tips`).then((res) => res.data);
};

// add new tip:
export const addNewTip = (tip: Tip): Promise<Tip> => {
  return axios.post(`${baseUrl}/community/tips`, tip).then((res) => res.data);
};

// delete tip:
export const deleteTip = (uuid: string): Promise<void> => {
  return axios
    .delete(`${baseUrl}/community/tips/${encodeURIComponent(uuid)}`)
    .then((res) => res.data);
};
