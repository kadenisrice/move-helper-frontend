import { FormEvent, useContext, useState } from "react";
import "./AccountForm.css";
import Account from "../../models/Account";
import AuthContext from "../../context/AuthContext";
import { updateAccountById } from "../../services/accountApi";

const AccountForm = () => {
  const { account, user } = useContext(AuthContext);

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
          zip: +toZipcode,
        },
        fromAddress: {
          street: fromStreet,
          city: fromCity,
          state: fromState,
          zip: +fromZipcode,
        },
        tasks: [],
        orders: [],
        expenses: [],
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
        <label htmlFor="street">Street:</label>
        <input
          type="street"
          name="street"
          id="street"
          value={fromStreet}
          onChange={(e) => setFromStreet(e.target.value)}
        />

        <label htmlFor="city">City:</label>
        <input
          type="city"
          name="city"
          id="city"
          value={fromCity}
          onChange={(e) => setFromCity(e.target.value)}
        />

        <label htmlFor="state">State:</label>
        <input
          type="state"
          name="state"
          id="state"
          value={fromState}
          onChange={(e) => setFromState(e.target.value)}
        />

        <label htmlFor="zipcode">Zipcode:</label>
        <input
          type="zip"
          name="zipcode"
          id="zipcode"
          value={fromZipcode}
          onChange={(e) => setFromZipcode(e.target.value)}
        />
      </div>

      <div className="address">
        <p>New Address:</p>
        <label htmlFor="street">Street:</label>
        <input
          type="street"
          name="street"
          id="street"
          value={toStreet}
          onChange={(e) => setToStreet(e.target.value)}
        />

        <label htmlFor="city">City:</label>
        <input
          type="city"
          name="city"
          id="city"
          value={toCity}
          onChange={(e) => setToCity(e.target.value)}
        />

        <label htmlFor="state">State:</label>
        <input
          type="state"
          name="state"
          id="state"
          value={toState}
          onChange={(e) => setToState(e.target.value)}
        />

        <label htmlFor="zipcode">Zipcode:</label>
        <input
          type="zip"
          name="zipcode"
          id="zipcode"
          value={toZipcode}
          onChange={(e) => setToZipcode(e.target.value)}
        />
      </div>

      <button>Add information to your account</button>
    </form>
  );
};

export default AccountForm;
