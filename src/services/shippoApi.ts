import axios from "axios";
import ShippoObject from "../models/ShippoObject";
import ShipmentData from "../models/ShipmentData";

const shippoApiKey: string =
  import.meta.env.VITE_SHIPPO_API_KEY ?? "API key not present!!";

const baseUrl: string = import.meta.env.VITE_SHIPPO_BASE_URL ?? "NOT FOUND";

//getting rates from Shippo (post)
export const getRatesFromShippo = async (
  data: ShipmentData
): Promise<ShippoObject | void> => {
  try {
    return (
      await axios.post(`${baseUrl}`, data, {
        headers: { Authorization: shippoApiKey },
      })
    ).data;
  } catch (err) {
    console.log(err);
  }
};
