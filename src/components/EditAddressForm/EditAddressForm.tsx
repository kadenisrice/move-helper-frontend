import { FormEvent, useContext, useState } from "react";
import "./EditAddressForm.css";
import AuthContext from "../../context/AuthContext";
import Account from "../../models/Account";
import { updateAccountById } from "../../services/accountApi";

const EditAddressForm = () => {
  const { account, setAccount } = useContext(AuthContext);

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

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (account) {
      const updatedAccount: Account = {
        uid: account.uid,
        name: account.name,
        displayName: account.displayName ?? "",
        email: account.email ?? "",
        phoneNumber: account.phoneNumber,
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
        tasks: [...account.tasks],
        orders: [...account.orders],
        expenses: [...account.expenses],
        boxes: [...account.boxes],
        boxSets: [...account.boxSets],
      };
      updateAccountById(account._id!, updatedAccount).then((res) => {
        if (res) {
          setAccount(res);
        }
      });
    }
  };

  return (
    <form className="EditAddressForm" onSubmit={(e) => submitHandler(e)}>
      <h2>Edit Address</h2>

      <div className="to-address-edit address">
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
      </div>

      <div className="from-address-edit address">
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
      </div>
      <button>Update Address</button>
    </form>
  );
};

export default EditAddressForm;
