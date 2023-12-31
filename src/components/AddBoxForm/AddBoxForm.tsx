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
      <h2 className="header-h2">Add a box to your current box set! </h2>
      <div className="add-box-input">
        <label htmlFor="length">Length:</label>
        <input
          type="text"
          id="length"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          required
        />
      </div>

      <div className="add-box-input">
        <label htmlFor="width">Width:</label>
        <input
          type="text"
          id="width"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          required
        />
      </div>

      <div className="add-box-input">
        <label htmlFor="height">Height:</label>
        <input
          type="text"
          id="height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
        />
      </div>

      <div className="add-box-input">
        <label htmlFor="weight">Weight:</label>
        <input
          type="text"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
      </div>
      <button>Create Box</button>
    </form>
  );
};

export default AddBoxForm;
