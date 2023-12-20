import { useContext, useEffect, useState } from "react";
import AddBoxForm from "../AddBoxForm/AddBoxForm";
import EditAddressForm from "../EditAddressForm/EditAddressForm";
import "./CostEstimate.css";

import AuthContext from "../../context/AuthContext";

import DisplayUserBoxes from "../DisplayUserBoxes/DisplayUserBoxes";

import UhaulEstimate from "../UhaulEstimate/UhaulEstimate";
import { useNavigate } from "react-router-dom";
import RateList from "../RateList/RateList";

const CostEstimate = () => {
  const { account, user } = useContext(AuthContext);

  const [selectedTab, setSelectedTab] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    if (!account || !user || !account.toAddress.state) {
      navigate("/");
    }
  }, [user]);

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
