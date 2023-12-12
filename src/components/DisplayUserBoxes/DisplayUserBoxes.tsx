import { useContext } from "react";
import "./DisplayUserBoxes.css";
import AuthContext from "../../context/AuthContext";
import {
  getAccountById,
  removeBox,
  updateBoxQuantity,
} from "../../services/accountApi";

const DisplayUserBoxes = () => {
  const { account, setAccount } = useContext(AuthContext);

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

  return (
    <div className="DisplayUserBoxes">
      <h2>Your Boxes</h2>
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
