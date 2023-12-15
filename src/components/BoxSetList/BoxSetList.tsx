import { useContext } from "react";
import { ReccomendedBoxSetsDataArr } from "../../utilities/ReccomendedBoxSetsData";
import "./BoxSetList.css";
import AuthContext from "../../context/AuthContext";

interface Props {
  setShowBoxSetList: (b: boolean) => void;
}

const BoxSetList = ({ setShowBoxSetList }: Props) => {
  const { account } = useContext(AuthContext);

  return (
    <div className="BoxSetList">
      <h2>Premade Box Sets</h2>
      <ul className="premade-list">
        {ReccomendedBoxSetsDataArr.map((boxset) => (
          <li key={boxset.uuid}>
            <p>{boxset.name}</p>
            <p>{boxset.maxSquareFeet} square feet</p>
          </li>
        ))}
      </ul>

      <h2>My Box Set</h2>
      <ul className="premade-list">
        {account &&
          account.boxSets.map((boxset) => (
            <li key={boxset.uuid}>
              <p>{boxset.name}</p>
              {boxset.maxSquareFeet && boxset.maxSquareFeet > 0 ? (
                <p>{boxset.maxSquareFeet} square feet</p>
              ) : (
                <p></p>
              )}
              button
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BoxSetList;
