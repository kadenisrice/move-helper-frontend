import { useContext, useEffect, useState } from "react";
import AddBoxForm from "../AddBoxForm/AddBoxForm";
import EditAddressForm from "../EditAddressForm/EditAddressForm";
import "./CostEstimate.css";

import AuthContext from "../../context/AuthContext";

import DisplayUserBoxes from "../DisplayUserBoxes/DisplayUserBoxes";

import UhaulEstimate from "../UhaulEstimate/UhaulEstimate";
import { useNavigate } from "react-router-dom";
import RateList from "../RateList/RateList";
import InfoPopUp from "../InfoPopUp/InfoPopUp";

const CostEstimate = () => {
  const { account, user } = useContext(AuthContext);

  const [selectedTab, setSelectedTab] = useState(0);

  const [displayInfo, setDisplayInfo] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (!account || !user || !account.toAddress.state) {
      navigate("/");
    }
  }, [user]);

  const getInfoBasedOnSelectedTab = (): string[] => {
    if (selectedTab === 1) {
      return [
        "Get real-time shipping cost estimates from major carriers.",
        "Costs are calculated based on box dimensions, weight, and shipping destinations.",
        "Compare rates across different carriers like USPS and UPS",
        "Estimates on the most cost-effective or fastest shipping option for your needs.",
      ];
    } else if (selectedTab === 2) {
      return [
        "Calculate the estimated cost of renting a U-Haul for your move.",
        "Enter the size of the U-Haul truck you're considering and your travel distance.",
        "Estimate includes rental fees and estimated fuel costs per mile.",
        "Compare different truck sizes to find the most economical option.",
        "We'll also check if your boxes fit in the U-Haul, ensuring enough space for easy packing.",
      ];
    } else if (selectedTab === 3) {
      return [
        "Update shipping and destination addresses to get accurate cost estimates.",
        "Addresses are essential for calculating precise shipping.",
        "Ensure your address details are current for the most accurate estimates.",
      ];
    } else {
      return [
        "Define each box by its length, width, height, and weight.",
        " Specify the number of boxes of each type you anticipate having.",
        " As you add boxes, they will appear below, allowing you to add as many or as few as you need.",
      ];
    }
  };

  return (
    <div className="CostEstimate">
      {/* this is the top tab bar where the user can navigate through out the cost estimate page */}
      <div className="cost-estimate-tabs">
        <button
          className={`your-boxes ${selectedTab === 0 ? "selected" : ""}`}
          onClick={() => {
            setSelectedTab(0);
          }}
        >
          Your Boxes
        </button>

        <button
          className={`rate-lists ${selectedTab === 1 ? "selected" : ""}`}
          onClick={() => {
            setSelectedTab(1);
          }}
        >
          Cost Estimates
        </button>

        <button
          className={`uhaul-estimate ${selectedTab === 2 ? "selected" : ""}`}
          onClick={() => {
            setSelectedTab(2);
          }}
        >
          Uhaul Calculator
        </button>

        <button
          className={`edit-address-tab ${selectedTab === 3 ? "selected" : ""}`}
          onClick={() => {
            setSelectedTab(3);
          }}
        >
          Edit Address
        </button>
        <div
          onClick={() => setDisplayInfo((prev) => !prev)}
          className={`info-span ${displayInfo ? "isActive" : ""}`}
        >
          ?{displayInfo && <InfoPopUp info={getInfoBasedOnSelectedTab()} />}
        </div>
      </div>

      <div className="tab-components">
        {/* this is the first "your boxes" tab where you can add boxes, box sets, and see your boxes */}
        {selectedTab === 0 && (
          <div className="form-boxlist">
            <AddBoxForm />
            <DisplayUserBoxes />
          </div>
        )}

        {/* Cost Estimates being conditionally rendered */}
        {selectedTab === 1 && <RateList />}

        {/* Uhaul calculator thingy conditionally rendered */}
        {selectedTab === 2 && <UhaulEstimate />}

        {/* Edit Address tab being conditionally rendered */}
        {selectedTab === 3 && <EditAddressForm />}
      </div>
    </div>
  );
};

export default CostEstimate;
