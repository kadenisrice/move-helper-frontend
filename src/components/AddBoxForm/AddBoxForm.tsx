import { FormEvent, useContext, useState } from "react";
import "./AddBoxForm.css";
import AuthContext from "../../context/AuthContext";
import Account from "../../models/Account";
import { updateAccountById } from "../../services/accountApi";
import { v4 as uuidv4 } from "uuid";

const AddBoxForm = () => {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const { user, account, setAccount } = useContext(AuthContext);

  // submitHandler function
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(account);

    if (user && account) {
      const updatedAccount: Account = {
        ...account,
        boxes: [
          ...account.boxes,
          {
            uuid: uuidv4(),
            length,
            width,
            height,
            distance_unit: "in",
            weight,
            mass_unit: "lb",
            quantity: 1,
          },
        ],
      };
      // const updatedAccount: Account = {
      //   uid: user.uid,
      //   name: account.name,
      //   displayName: user.displayName ?? "",
      //   email: user.email ?? "",
      //   phoneNumber: account.phoneNumber,
      //   toAddress: {
      //     street: account.toAddress.street,
      //     city: account.toAddress.city,
      //     state: account.toAddress.state,
      //     zip: account.toAddress.zip,
      //   },
      //   fromAddress: {
      //     street: account.fromAddress.street,
      //     city: account.fromAddress.city,
      //     state: account.fromAddress.state,
      //     zip: account.fromAddress.zip,
      //   },
      //   tasks: [...account.tasks],
      //   orders: [...account.orders],
      //   expenses: [...account.expenses],
      // boxes: [
      //   ...account.boxes,
      //   {
      //     uuid: uuidv4(),
      //     length,
      //     width,
      //     height,
      //     distance_unit: "in",
      //     weight,
      //     mass_unit: "lb",
      //     quantity: 1,
      //   },
      // ],
      // };

      updateAccountById(account._id!, updatedAccount).then((res) => {
        if (res) {
          setAccount(res);
        }
      });
    }

    setLength("");
    setHeight("");
    setWidth("");
    setWeight("");
  };

  return (
    <form className="AddBoxForm" onSubmit={(e) => submitHandler(e)}>
      <h2>Add Box</h2>
      <label htmlFor="length">Length:</label>
      <input
        type="text"
        id="length"
        value={length}
        onChange={(e) => setLength(e.target.value)}
        required
      />

      <label htmlFor="width">Width:</label>
      <input
        type="text"
        id="width"
        value={width}
        onChange={(e) => setWidth(e.target.value)}
        required
      />

      <label htmlFor="height">Height:</label>
      <input
        type="text"
        id="height"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        required
      />

      <label htmlFor="weight">Weight:</label>
      <input
        type="text"
        id="weight"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        required
      />
      <button>Add Box</button>
    </form>
  );
};

export default AddBoxForm;
