import ShippoObject from "../../models/ShippoObject";
import "./RateList.css";

interface Props {
  costEstimate: ShippoObject | null;
}

const RateList = ({ costEstimate }: Props) => {
  return (
    <div className="RateList">
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
    </div>
  );
};

export default RateList;
