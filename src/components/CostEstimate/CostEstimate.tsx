import { useContext, useEffect, useState } from "react";
import AddBoxForm from "../AddBoxForm/AddBoxForm";
import EditAddressForm from "../EditAddressForm/EditAddressForm";
import "./CostEstimate.css";
import { getRatesFromShippo } from "../../services/shippoApi";
import AuthContext from "../../context/AuthContext";

const CostEstimate = () => {
  const { account } = useContext(AuthContext);

  const [showEditAddressForm, setShowEditAddressForm] = useState(false);

  useEffect(() => {
    if (account) {
      getRatesFromShippo({
        address_from: {
          name: account.displayName,
          street1: "215 Clayton St.",
          city: "San Francisco",
          state: "CA",
          zip: "94117",
          country: "US",
          phone: "+1 555 341 9393",
          email: "shippotle@goshippo.com",
        },
        address_to: {
          name: "Mr. Hippo",
          street1: "123 Main St.",
          city: "New York",
          state: "NY",
          zip: "10001",
          country: "US",
          phone: "+1 555 341 9393",
          email: "mrhippo@goshippo.com",
        },
        parcels: account.boxes,
        async: false,
      }).then((res) => console.log(res));
    }
  }, []);

  return (
    <div className="CostEstimate">
      <button onClick={() => setShowEditAddressForm((prev) => !prev)}>
        Edit Address Information
      </button>
      {showEditAddressForm && <EditAddressForm />}
      <AddBoxForm />
      <h2>Cost Estimate</h2>
      <button>Calculate Cost Estimate</button>
    </div>
  );
};

export default CostEstimate;
