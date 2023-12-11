import { FormEvent, useState } from "react";
import "./UhaulEstimate.css";

const UhaulEstimate = () => {
  const [miles, setMiles] = useState("");
  const [truck, setTruck] = useState("");
  const [cost, setCost] = useState("");

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
          <option value="trucks">Pickup Truck</option>
          <option value="trucks">Cargo Van</option>
          <option value="trucks">10' Truck</option>
          <option value="trucks">15' Truck</option>
          <option value="trucks">20' Truck</option>
          <option value="trucks">26' Truck</option>
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
    </div>
  );
};

export default UhaulEstimate;
