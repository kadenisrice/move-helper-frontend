import { useContext, useEffect, useState } from "react";
import "./UhaulEstimate.css";
import UHaul from "../../models/UHaulTruck";
import { Box } from "../../models/Account";
import AuthContext from "../../context/AuthContext";
import UhaulContext from "../../context/UhaulContext";
import uhualFleet from "../../utilities/UHaulTruckData";

const UhaulEstimate = () => {
  const { truckOption, milesTraveling, setTruckOption, setMilesTraveling } =
    useContext(UhaulContext);

  const [miles, setMiles] = useState("");
  const [truck, setTruck] = useState("");
  const [currentUHaulTruck, setCurrentUHaulTruck] = useState<UHaul | null>(
    null
  );
  const [estimate, setEstimate] = useState(0);

  const { account } = useContext(AuthContext);

  const getCurrentTruck = (truckType: string) => {
    return uhualFleet.find((truck) => truck.type === truckType);
  };

  useEffect(() => {
    if (milesTraveling) {
      setMiles(milesTraveling);
    } else {
    }
    if (truckOption) {
      setTruck(truckOption);
    }
    if (currentUHaulTruck && miles) {
      const truckBaseRate = currentUHaulTruck?.rate.baseRate;
      const truckPerMileRate = currentUHaulTruck?.rate.perMile;
      const milesAsNumber: number = +miles;
      setEstimate(truckBaseRate + truckPerMileRate * milesAsNumber);
    } else {
      setEstimate(0);
    }
  }, [currentUHaulTruck, miles]);

  useEffect(() => {
    const currentTruck = getCurrentTruck(truck);

    if (currentTruck) {
      setCurrentUHaulTruck(currentTruck);
    }
  }, [truck]);

  const calculateBoxFitAndRemainingSpace = (uhaul: UHaul, boxes: Box[]) => {
    let totalBoxVolume = 0.0;
    const marginError = 0.75; // 25% margin

    boxes.forEach((box) => {
      totalBoxVolume +=
        box.quantity *
        ((+box.length / 12) * (+box.width / 12) * (+box.height / 12));
    });

    const adjustedUhaulVolume = uhaul.volume * marginError;

    if (totalBoxVolume <= adjustedUhaulVolume) {
      const remainingSpace = adjustedUhaulVolume - totalBoxVolume;
      return `Your boxes fit. Remaining space in U-Haul: ${Math.round(
        remainingSpace
      )} cubic feet.`;
    } else {
      const additionalSpaceNeeded = totalBoxVolume - adjustedUhaulVolume;
      return `Your boxes do not fit. Additional space needed: ${Math.round(
        additionalSpaceNeeded
      )} cubic feet.`;
    }
  };

  return (
    <div className="UhaulEstimate">
      <h2>Uhaul Cost Estimates</h2>
      <div className="form-rates">
        <form className="truck-form">
          <div className="truck-options">
            <p>Truck Options:</p>
            <select
              name="trucks"
              id="trucks"
              value={truck}
              onChange={(e) => {
                setTruck(e.target.value);
                setTruckOption(e.target.value);
              }}
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
          </div>
          <div className="miles-input">
            <label htmlFor="miles-traveled">Miles Traveling:</label>
            <input
              type="text"
              id="miles-traveled"
              name="miles-traveled"
              value={miles}
              onChange={(e) => {
                setMiles(e.target.value);
                setMilesTraveling(e.target.value);
              }}
              required
            />
          </div>
        </form>

        <div className="uhaul-rates">
          {currentUHaulTruck && (
            <>
              <h3 style={{ textAlign: "center" }}>
                {currentUHaulTruck.movingType}
              </h3>
              <div className="uHaulDiplayContainer">
                <div className="uhaul-info">
                  <p>Dimensions: {currentUHaulTruck.dimensions.inside}</p>
                  {currentUHaulTruck.dimensions.doorOpening && (
                    <p>
                      Door Opening: {currentUHaulTruck.dimensions.doorOpening}
                    </p>
                  )}
                  {currentUHaulTruck.dimensions.deckHeight && (
                    <p>
                      Deck: {currentUHaulTruck.dimensions.deckHeight}
                      {" x "}
                      {currentUHaulTruck.dimensions.length}
                    </p>
                  )}

                  {currentUHaulTruck.dimensions.loadingRamp && (
                    <p>{currentUHaulTruck.dimensions.loadingRamp}</p>
                  )}
                  <p>Cost: ${currentUHaulTruck.rate.baseRate}</p>
                  <p>Plus ${currentUHaulTruck.rate.perMile} per mile</p>
                </div>
                <img src={currentUHaulTruck.image} alt="" />
              </div>
            </>
          )}
          {estimate > 0 && (
            <p className="estimate-info">
              {currentUHaulTruck?.type} traveling {miles} miles would cost
              roughly ${estimate.toFixed(2)}
              <i> *not including tax</i>
            </p>
          )}
          <p className="estimate-info remaining-space">
            {currentUHaulTruck &&
              account &&
              calculateBoxFitAndRemainingSpace(
                currentUHaulTruck,
                account.boxes
              )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UhaulEstimate;
