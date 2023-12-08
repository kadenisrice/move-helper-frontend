import { Link } from "react-router-dom";
import "./Dashboard.css";
import { useEffect } from "react";
import { getRatesFromShippo } from "../../services/shippoApi";

const Dashboard = () => {
  useEffect(() => {
    getRatesFromShippo({
      address_from: {
        name: "Shawn Ippotle",
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
      parcels: [
        {
          length: "10",
          width: "10",
          height: "10",
          distance_unit: "in",
          weight: "5",
          mass_unit: "lb",
        },
      ],
      async: false,
    }).then((res) => console.log(res));
  }, []);

  return (
    <div className="Dashboard">
      <p>dashboard werks</p>
      <Link to={"/tasks"}>Tasks</Link>
    </div>
  );
};

export default Dashboard;
