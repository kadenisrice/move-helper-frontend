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
import BoxSetList from "../BoxSetList/BoxSetList";

const CostEstimate = () => {
  const { account, user } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!account || !user) {
      navigate("/");
    }
  }, [user]);

  const [showEditAddressForm, setShowEditAddressForm] = useState(false);
  const [costEstimate, setCostEstimate] = useState<ShippoObject | null>(null);
  const [showBoxSetList, setShowBoxSetList] = useState(false);

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
        <p>Your Boxes</p>
        <p>Cost Estimates</p>
        <p>Uhaul Calculator</p>
        <p>Edit Address</p>
      </div>

      {/* <button onClick={() => setShowEditAddressForm((prev) => !prev)}>
        Edit Address Information
      </button>
      {showEditAddressForm && <EditAddressForm />}

      <button onClick={() => setShowBoxSetList((prev) => !prev)}>
        Choose box set
      </button>
      {showBoxSetList && <BoxSetList setShowBoxSetList={setShowBoxSetList} />} */}

      {/* this is the first "your boxes" tab where you can add boxes, box sets, and see your boxes */}
      <div className="form-boxlist">
        <AddBoxForm />
        <DisplayUserBoxes />
      </div>

      <h2>Cost Estimate</h2>
      <div className="rates-lists">
        <ul>
          {costEstimate?.rates
            .filter((rate) => {
              return rate.provider === "UPS";
            })
            .sort((a, b) => +a.amount - +b.amount)
            .map((rate) => (
              <li key={rate.object_id}>
                <p>{rate.provider}</p>
                <p>${rate.amount}</p>
                <p>{rate.duration_terms}</p>
              </li>
            ))}
        </ul>
        <ul>
          {costEstimate?.rates
            .filter((rate) => {
              return rate.provider === "USPS";
            })
            .sort((a, b) => +a.amount - +b.amount)
            .map((rate) => (
              <li key={rate.object_id}>
                <p>{rate.provider}</p>
                <p>${rate.amount}</p>
                <p>{rate.duration_terms}</p>
              </li>
            ))}
        </ul>
      </div>

      <UhaulEstimate />
    </div>
  );
};

export default CostEstimate;
