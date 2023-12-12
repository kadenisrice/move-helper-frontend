import { FormEvent, useEffect, useState } from "react";
import "./UhaulEstimate.css";
import uhualFleet from "../../Utilities/UHaulTruckData";
import UHaul from "../../models/UHaulTruck";

const UhaulEstimate = () => {
  const [miles, setMiles] = useState("");
  const [truck, setTruck] = useState("");
  const [currentUHaulTruck, setCurrentUHaulTruck] = useState<UHaul | null>(
    null
  );
  const [cost, setCost] = useState("");

  const getCurrentTruck = (truckType: string) => {
    return uhualFleet.find((truck) => truck.type === truckType);
  };

  console.log(truck);

  useEffect(() => {
    const currentTruck = getCurrentTruck(truck);

    if (currentTruck) {
      setCurrentUHaulTruck(currentTruck);
    }
  }, [truck]);

  const submitHandler = (e: FormEvent) => {};

  return (
    <div className="UhaulEstimate">
      <h2>Uhaul Cost Estimates</h2>

      <form onSubmit={() => {}}>
        <p>Truck Options:</p>
        <select
          name="trucks"
          id="trucks"
          value={truck}
          onChange={(e) => setTruck(e.target.value)}
        >
          <option value="UHaul Trucks">UHaul Trucks</option>
          <option value="8' Pickup Truck">8' Pickup Truck</option>
          <option value="9' Cargo Van">9' Cargo Van</option>
          <option value="10' Truck">10' Truck</option>
          <option value="15' Truck">15' Truck</option>
          <option value="17' Truck">17' Truck</option>
          <option value="20' Truck">20' Truck</option>
          <option value="26' Truck">26' Truck</option>
        </select>

        <label htmlFor="miles-traveled">Miles Traveling:</label>
        <input
          type="text"
          id="miles-traveled"
          name="miles-traveled"
          value={miles}
          onChange={(e) => setMiles(e.target.value)}
        />

        <button>calculate uhaul estimate</button>
      </form>
      {currentUHaulTruck && (
        <div>
          <h2>{currentUHaulTruck.movingType}</h2>
          <p>{currentUHaulTruck.dimensions.deckHeight}</p>
          <p>{currentUHaulTruck.dimensions.doorOpening}</p>
          <p>{currentUHaulTruck.dimensions.inside}</p>
          <p>{currentUHaulTruck.dimensions.length}</p>
          <p>{currentUHaulTruck.dimensions.loadingRamp}</p>
          <p>{currentUHaulTruck.rate.baseRate}</p>
          <p>{currentUHaulTruck.rate.perMile}</p>
        </div>
      )}
    </div>
  );
};

export default UhaulEstimate;
