import { useContext, useState } from "react";
import "./EditAddressForm.css";
import AuthContext from "../../context/AuthContext";

const EditAddressForm = () => {
  const { account } = useContext(AuthContext);

  // this is to set the TO ADDRESS:
  const [toStreet, setToStreet] = useState(account?.toAddress.street ?? "");
  const [toCity, setToCity] = useState(account?.toAddress.city ?? "");
  const [toState, setToState] = useState(account?.toAddress.state ?? "");
  const [toZipcode, setToZipcode] = useState(account?.toAddress.zip ?? "");

  // this is to set the FROM ADDRESS:
  const [fromStreet, setFromStreet] = useState(
    account?.fromAddress.street ?? ""
  );
  const [fromCity, setFromCity] = useState(account?.fromAddress.city ?? "");
  const [fromState, setFromState] = useState(account?.fromAddress.state ?? "");
  const [fromZipcode, setFromZipcode] = useState(
    account?.fromAddress.zip ?? ""
  );

  return (
    <div className="EditAddressForm">
      <h2>Edit Address</h2>

      <h3>To Address</h3>
      <input
        type="text"
        value={toStreet}
        onChange={(e) => setToStreet(e.target.value)}
        placeholder="Street"
      />
      <input
        type="text"
        value={toCity}
        onChange={(e) => setToCity(e.target.value)}
        placeholder="City"
      />
      <input
        type="text"
        value={toState}
        onChange={(e) => setToState(e.target.value)}
        placeholder="State"
      />
      <input
        type="text"
        value={toZipcode}
        onChange={(e) => setToZipcode(e.target.value)}
        placeholder="Zipcode"
      />

      <h3>From Address</h3>
      <input
        type="text"
        value={fromStreet}
        onChange={(e) => setFromStreet(e.target.value)}
        placeholder="Street"
      />
      <input
        type="text"
        value={fromCity}
        onChange={(e) => setFromCity(e.target.value)}
        placeholder="City"
      />
      <input
        type="text"
        value={fromState}
        onChange={(e) => setFromState(e.target.value)}
        placeholder="State"
      />
      <input
        type="text"
        value={fromZipcode}
        onChange={(e) => setFromZipcode(e.target.value)}
        placeholder="Zipcode"
      />
      <button>Update Address</button>
    </div>
  );
};

export default EditAddressForm;
