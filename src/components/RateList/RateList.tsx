import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import ShippoObject from "../../models/ShippoObject";
import "./RateList.css";
import { getRatesFromShippo } from "../../services/shippoApi";
import { Box } from "../../models/Account";

// interface Props {
//   costEstimate: ShippoObject | null;
// }

const RateList = () => {
  const { account } = useContext(AuthContext);
  const [costEstimate, setCostEstimate] = useState<ShippoObject | null>(null);

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
    <div className="RateList">
      <h2>Here are shipping rates for your current box sets!</h2>
      <div className="rates-lists">
        <ul className="ups-list rate-list">
          {costEstimate?.rates
            .filter((rate) => {
              return rate.provider === "UPS";
            })
            .sort((a, b) => +a.amount - +b.amount)
            .map((rate) => (
              <li className="rate-item" key={rate.object_id}>
                <p>{rate.provider}</p>
                <p>${rate.amount}</p>
                <p>{rate.duration_terms}</p>
              </li>
            ))}
        </ul>
        <ul className="ups-list rate-list">
          {costEstimate?.rates
            .filter((rate) => {
              return rate.provider === "USPS";
            })
            .sort((a, b) => +a.amount - +b.amount)
            .map((rate) => (
              <li className="rate-item" key={rate.object_id}>
                <p>{rate.provider}</p>
                <p>${rate.amount}</p>
                <p>{rate.duration_terms}</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default RateList;
