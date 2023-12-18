import { useContext } from "react";
import "./BoxSetList.css";
import AuthContext from "../../context/AuthContext";
import BoxSet from "../../models/BoxSet";
import Account from "../../models/Account";
import { updateAccountById } from "../../services/accountApi";
import { ReccomendedBoxSetsDataArr } from "../../Utilities/ReccomendedBoxSetsData";

interface Props {
  setShowBoxSetList: (b: boolean) => void;
}

const BoxSetList = ({ setShowBoxSetList }: Props) => {
  const { account, user, setAccount } = useContext(AuthContext);

  const clickHandler = (boxset: BoxSet) => {
    if (user && account) {
      const updatedAccount: Account = {
        ...account,
        boxes: boxset.boxes,
      };

      updateAccountById(account._id!, updatedAccount).then((res) => {
        if (res) {
          setAccount(res);
        }
      });
    }
  };

  return (
    <div className="BoxSetList">
      <h2>Premade Box Sets</h2>
      <ul className="premade-list">
        {ReccomendedBoxSetsDataArr.map((boxset) => (
          <li
            key={boxset.uuid}
            onClick={() => {
              clickHandler(boxset);
              setShowBoxSetList(false);
            }}
          >
            <p>{boxset.name}</p>
            <p>{boxset.maxSquareFeet} square feet</p>
          </li>
        ))}
      </ul>

      <h2>My Box Sets</h2>
      <ul className="premade-list">
        {account &&
          account.boxSets.map((boxset) => (
            <li
              key={boxset.uuid}
              onClick={() => {
                clickHandler(boxset);
                setShowBoxSetList(false);
              }}
            >
              <p>{boxset.name}</p>
              {boxset.maxSquareFeet && boxset.maxSquareFeet > 0 ? (
                <p>{boxset.maxSquareFeet} square feet</p>
              ) : (
                <p></p>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BoxSetList;