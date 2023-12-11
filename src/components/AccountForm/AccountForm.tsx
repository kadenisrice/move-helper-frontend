import { FormEvent, useContext, useState } from "react";
import "./AccountForm.css";
import Account from "../../models/Account";
import AuthContext from "../../context/AuthContext";
import { updateAccountById } from "../../services/accountApi";
import { useNavigate } from "react-router-dom";

interface Props {
  setShowForm: (b: boolean) => void;
}

const AccountForm = ({ setShowForm }: Props) => {
  const { account, user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [nickname, setNickname] = useState("");

  // this is to set the TO ADDRESS:
  const [toStreet, setToStreet] = useState("");
  const [toCity, setToCity] = useState("");
  const [toState, setToState] = useState("");
  const [toZipcode, setToZipcode] = useState("");

  // this is to set the FROM ADDRESS:
  const [fromStreet, setFromStreet] = useState("");
  const [fromCity, setFromCity] = useState("");
  const [fromState, setFromState] = useState("");
  const [fromZipcode, setFromZipcode] = useState("");

  // -----------------------------------------------------------

  // submitHandler function
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (user && account) {
      const updatedAccount: Account = {
        uid: user.uid,
        name: nickname,
        displayName: user.displayName ?? "",
        email: user.email ?? "",
        phoneNumber: phoneNumber,
        toAddress: {
          street: toStreet,
          city: toCity,
          state: toState,
          zip: toZipcode,
        },
        fromAddress: {
          street: fromStreet,
          city: fromCity,
          state: fromState,
          zip: fromZipcode,
        },
        tasks: [],
        orders: [],
        expenses: [],
        boxes: [],
      };

      updateAccountById(account._id!, updatedAccount);
    }

    setNickname("");
    setPhoneNumber("");
    setFromStreet("");
    setFromCity("");
    setFromState("");
    setFromZipcode("");
    setToStreet("");
    setToCity("");
    setToState("");
    setToZipcode("");
    setShowForm(false);
    navigate("/dashboard");
  };

  return (
    <form className="AccountForm" onSubmit={(e) => submitHandler(e)}>
      <h2>Tell us more about your move!</h2>

      <label htmlFor="nickname">Nickname:</label>
      <input
        type="text"
        name="nickname"
        id="nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />

      <label htmlFor="phone-number">Phone Number:</label>
      <input
        type="text"
        name="phone-number"
        id="phone-number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />

      <div className="address">
        <p>Current Address:</p>
        <label htmlFor="from-street">Street:</label>
        <input
          type="text"
          name="from-street"
          id="from-street"
          value={fromStreet}
          onChange={(e) => setFromStreet(e.target.value)}
        />

        <label htmlFor="from-city">City:</label>
        <input
          type="text"
          name="from-city"
          id="from-city"
          value={fromCity}
          onChange={(e) => setFromCity(e.target.value)}
        />

        <label htmlFor="from-state">State:</label>
        <input
          type="text"
          name="from-state"
          id="from-state"
          value={fromState}
          onChange={(e) => setFromState(e.target.value)}
        />

        <label htmlFor="from-zipcode">Zipcode:</label>
        <input
          type="text"
          name="from-zipcode"
          id="from-zipcode"
          value={fromZipcode}
          onChange={(e) => setFromZipcode(e.target.value)}
        />
      </div>

      <div className="address">
        <p>New Address:</p>
        <label htmlFor="to-street">Street:</label>
        <input
          type="text"
          name="to-street"
          id="to-street"
          value={toStreet}
          onChange={(e) => setToStreet(e.target.value)}
        />

        <label htmlFor="to-city">City:</label>
        <input
          type="text"
          name="to-city"
          id="to-city"
          value={toCity}
          onChange={(e) => setToCity(e.target.value)}
        />

        <label htmlFor="to-state">State:</label>
        <input
          type="text"
          name="to-state"
          id="to-state"
          value={toState}
          onChange={(e) => setToState(e.target.value)}
        />

        <label htmlFor="to-zipcode">Zipcode:</label>
        <input
          type="text"
          name="to-zipcode"
          id="to-zipcode"
          value={toZipcode}
          onChange={(e) => setToZipcode(e.target.value)}
        />
      </div>

      <button>Add information to your account</button>
    </form>
  );
};

export default AccountForm;
