import { useContext, useEffect, useState } from "react";
import AddBoxForm from "../AddBoxForm/AddBoxForm";
import EditAddressForm from "../EditAddressForm/EditAddressForm";
import "./CostEstimate.css";
import { getRatesFromShippo } from "../../services/shippoApi";
import AuthContext from "../../context/AuthContext";
import ShippoObject from "../../models/ShippoObject";
import DisplayUserBoxes from "../DisplayUserBoxes/DisplayUserBoxes";

const CostEstimate = () => {
  const { account } = useContext(AuthContext);

  const [showEditAddressForm, setShowEditAddressForm] = useState(false);
  const [costEstimate, setCostEstimate] = useState<ShippoObject | null>(null);

  useEffect(() => {
    if (account) {
      console.log(account.boxes);

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
        parcels: account.boxes,
        async: false,
      }).then((res) => {
        if (res) {
          setCostEstimate(res);
          console.log(res);
        }
      });
    }
  }, [account]);

  return (
    <div className="CostEstimate">
      <button onClick={() => setShowEditAddressForm((prev) => !prev)}>
        Edit Address Information
      </button>
      {showEditAddressForm && <EditAddressForm />}
      <AddBoxForm />
      <h2>Cost Estimate</h2>

      <ul>
        {costEstimate?.rates.map((rate) => (
          <li key={rate.object_id}>
            <p>{rate.provider}</p>
            <p>${rate.amount}</p>
            <p>{rate.duration_terms}</p>
          </li>
        ))}
      </ul>
      <DisplayUserBoxes />
    </div>
  );
};

export default CostEstimate;
