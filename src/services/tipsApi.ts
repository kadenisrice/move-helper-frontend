import axios from "axios";
import Tip from "../models/Tip";

// importing base URL from .env.local file
const baseUrl: string = import.meta.env.VITE_APP_BASE_URL ?? "";

// get all tips:
export const getAllTips = (sortValue?: string): Promise<Tip[]> => {
  const params = {
    "sort-value": sortValue,
  };

  return axios
    .get(`${baseUrl}/community/tips`, {
      params,
    })
    .then((res) => res.data);
};

// get tip by ID:
export const getTipById = async (uuid: string): Promise<Tip | void> => {
  try {
    return (
      await axios.get(`${baseUrl}/community/tips/${encodeURIComponent(uuid)}`)
    ).data;
  } catch (err) {
    console.log(err);
  }
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

// update tip:
export const updateTipById = async (
  uuid: string,
  tip: Tip
): Promise<Tip | void> => {
  try {
    return (
      await axios.put(
        `${baseUrl}/community/tips/${encodeURIComponent(uuid)}`,
        tip
      )
    ).data;
  } catch (err) {
    console.log(err);
  }
};
