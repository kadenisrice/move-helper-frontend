import { createContext } from "react";

export interface UhaulContextModel {
  truckOption: string;
  milesTraveling: string;
  setTruckOption: (s: string) => void;
  setMilesTraveling: (s: string) => void;
}

const defaultValue: UhaulContextModel = {
  truckOption: "",
  milesTraveling: "",
  setTruckOption: () => {},
  setMilesTraveling: () => {},
};

const UhaulContext = createContext(defaultValue);
export default UhaulContext;
