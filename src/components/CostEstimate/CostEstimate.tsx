import { useContext, useEffect, useState } from "react";
import AddBoxForm from "../AddBoxForm/AddBoxForm";
import EditAddressForm from "../EditAddressForm/EditAddressForm";
import "./CostEstimate.css";
import { getRatesFromShippo } from "../../services/shippoApi";
import AuthContext from "../../context/AuthContext";
import ShippoObject from "../../models/ShippoObject";
import DisplayUserBoxes from "../DisplayUserBoxes/DisplayUserBoxes";
import { Box } from "../../models/Account";
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

  const [costEstimate, setCostEstimate] = useState<ShippoObject | null>(null);

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

  useEffect(() => {
    if (account && account.boxes[0]) {
      const totalBoxes: Box[] = [];
      account.boxes.forEach((box) => {
        for (let index = 0; index < box.quantity; index++) {
          totalBoxes.push(box);
        }
      });

      getRatesFromShippo({
        address_from: {
          name: account.displayName,
          street1: account.fromAddress.street,
          city: account.fromAddress.city,
          state: account.fromAddress.state,
          zip: account.fromAddress.zip,
          country: "US",
          phone: account.phoneNumber,
          email: account.email,
        },
        address_to: {
          name: account.displayName,
          street1: account.toAddress.street,
          city: account.toAddress.city,
          state: account.toAddress.state,
          zip: account.toAddress.zip,
          country: "US",
          phone: account.phoneNumber,
          email: account.email,
        },

        parcels: totalBoxes,
        async: false,
      }).then((res) => {
        if (res) {
          setCostEstimate(res);
        }
      });
    } else {
      setCostEstimate(null);
    }
  }, [account]);

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
      {showRateList && <RateList costEstimate={costEstimate} />}

      {/* Uhaul calculator thingy conditionally rendered */}
      {showUhaul && <UhaulEstimate />}

      {/* Edit Address tab being conditionally rendered */}
      {showEditAddressForm && <EditAddressForm />}
    </div>
  );
};

export default CostEstimate;
