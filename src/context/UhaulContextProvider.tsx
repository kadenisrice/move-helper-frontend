import { ReactNode, useState } from "react";
import UhaulContext from "./UhaulContext";

const UhaulContextProvider = ({ children }: { children: ReactNode }) => {
  const [truckOption, setTruckOption] = useState("");
  const [milesTraveling, setMilesTraveling] = useState("");

  return (
    <UhaulContext.Provider
      value={{ truckOption, milesTraveling, setTruckOption, setMilesTraveling }}
    >
      {children}
    </UhaulContext.Provider>
  );
};
export default UhaulContextProvider;
