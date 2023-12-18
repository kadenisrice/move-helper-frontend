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

  const navigate = useNavigate();
  useEffect(() => {
    if (!account || !user) {
      navigate("/");
    }
  }, [user]);

  // these will be displayed as soon as the user enters cost estimate:
  const [showYourBoxTab, setShowYourBoxTab] = useState(true);

  // these are apart of the tabs at the top:
  const [showRateList, setShowRateList] = useState(false);
  const [showUhaul, setShowUhaul] = useState(false);
  const [showEditAddressForm, setShowEditAddressForm] = useState(false);

  const setAllFalse = () => {
    setShowYourBoxTab(false);
    setShowRateList(false);
    setShowUhaul(false);
    setShowEditAddressForm(false);
  };

  return (
    <div className="CostEstimate">
      {/* this is the top tab bar where the user can navigate through out the cost estimate page */}
      <div className="cost-estimate-tabs">
        <button
          onClick={() => {
            setAllFalse();

            setShowYourBoxTab(true);
          }}
        >
          Your Boxes
        </button>

        <button
          onClick={() => {
            setAllFalse();
            setShowRateList(true);
          }}
        >
          Cost Estimates
        </button>

        <button
          onClick={() => {
            setAllFalse();
            setShowUhaul(true);
          }}
        >
          Uhaul Calculator
        </button>

        <button
          onClick={() => {
            setAllFalse();
            setShowEditAddressForm(true);
          }}
        >
          Edit Address
        </button>
      </div>

      {/* this is the first "your boxes" tab where you can add boxes, box sets, and see your boxes */}
      {showYourBoxTab && (
        <div className="form-boxlist">
          <AddBoxForm />
          <DisplayUserBoxes />
        </div>
      )}

      {/* Cost Estimates being conditionally rendered */}
      {showRateList && <RateList />}

      {/* Uhaul calculator thingy conditionally rendered */}
      {showUhaul && <UhaulEstimate />}

      {/* Edit Address tab being conditionally rendered */}
      {showEditAddressForm && <EditAddressForm />}
    </div>
  );
};

export default CostEstimate;
