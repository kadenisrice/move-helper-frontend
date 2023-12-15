import { FormEvent, useContext, useState } from "react";
import "./DisplayUserBoxes.css";
import AuthContext from "../../context/AuthContext";
import {
  getAccountById,
  removeBox,
  updateAccountById,
  updateBoxQuantity,
} from "../../services/accountApi";
import Account from "../../models/Account";
import { v4 as uuidv4 } from "uuid";
import BoxSetList from "../BoxSetList/BoxSetList";

const DisplayUserBoxes = () => {
  const { account, setAccount, user } = useContext(AuthContext);

  const [boxSetName, setBoxSetName] = useState("");
  const [squareFeet, setSquareFeet] = useState("");
  const [showBoxSetList, setShowBoxSetList] = useState(false);

  const clickHandler = (uuid: string, newQuantity: number) => {
    updateBoxQuantity(uuid, newQuantity).then(() => {
      if (account) {
        getAccountById(account.uid).then((res) => {
          if (res) {
            setAccount(res);
          }
        });
      }
    });
  };

  const removeBoxHandler = (uuid: string, uid: string) => {
    removeBox(uuid, uid).then(() => {
      getAccountById(uid).then((response) => {
        if (response) {
          setAccount(response);
        }
      });
    });
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(account);

    if (user && account) {
      const updatedAccount: Account = {
        ...account,
        boxSets: [
          ...account.boxSets,
          {
            uuid: uuidv4(),
            name: boxSetName,
            maxSquareFeet: +squareFeet,
            boxes: account.boxes,
          },
        ],
      };

      updateAccountById(account._id!, updatedAccount).then((res) => {
        if (res) {
          setAccount(res);
        }
      });
      setBoxSetName("");
      setSquareFeet("");
    }
  };

  return (
    <div className="DisplayUserBoxes">
      <h2>Your Boxes</h2>
      <button onClick={() => setShowBoxSetList((prev) => !prev)}>
        Choose box set
      </button>
      {showBoxSetList && <BoxSetList setShowBoxSetList={setShowBoxSetList} />}
      <form onSubmit={(e) => submitHandler(e)}>
        <label htmlFor="set-name">Box Set Name:</label>
        <input
          type="text"
          id="set-name"
          name="set-name"
          value={boxSetName}
          onChange={(e) => setBoxSetName(e.target.value)}
        />

        <label htmlFor="max-square-feet"> Square Feet: {`(optional)`} </label>
        <input
          type="text"
          id="max-square-feet"
          name="max-square-feet"
          value={squareFeet}
          onChange={(e) => setSquareFeet(e.target.value)}
        />

        <button>save this box set</button>
      </form>
      <ul>
        {account?.boxes.map((box, index) => (
          <li key={box.uuid}>
            <h3>Box: {index + 1}</h3>
            <p>Quantity: {box.quantity}</p>
            <button
              onClick={() => clickHandler(box.uuid, -1)}
              disabled={box.quantity === 1}
            >
              -
            </button>
            <button onClick={() => clickHandler(box.uuid, +1)}>+</button>
            <p>Height: {box.height} in</p>
            <p>Length: {box.length} in</p>
            <p>Width: {box.width} in</p>
            <p>Weight: {box.weight} lbs</p>
            <i
              className="fa-solid fa-trash"
              onClick={() => removeBoxHandler(box.uuid, account.uid)}
            ></i>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayUserBoxes;
