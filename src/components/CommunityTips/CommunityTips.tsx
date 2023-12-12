import { FormEvent, useContext, useEffect, useState } from "react";
import "./CommunityTips.css";
import { addNewTip, getAllTips } from "../../services/tipsApi";

import { v4 as uuidv4 } from "uuid";
import AuthContext from "../../context/AuthContext";
import Tip from "../../models/Tip";

const CommunityTips = () => {
  const { account } = useContext(AuthContext);

  const [showTipForm, setShowTipForm] = useState(false);
  const [communityTips, setCommunityTips] = useState<Tip[]>([]);

  const [textArea, setTextArea] = useState("");

  // SUBMIT HANDLER -------------------------------------------------
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (account) {
      const newTip = {
        uuid: uuidv4(),
        from: account?.displayName,
        text: textArea,
        photoURL: account.photoURL,
      };

      await addNewTip(newTip);
    }

    setTextArea("");
  };

  useEffect(() => {
    getAllTips().then((res) => setCommunityTips(res));
  }, []);

  return (
    <div className="CommunityTips">
      <h2>Community Tips</h2>
      <button onClick={() => setShowTipForm((prev) => !prev)}>Add Tip</button>
      {showTipForm && (
        <>
          <form className="add-tip-form" onSubmit={(e) => submitHandler(e)}>
            <textarea
              placeholder="Send helpful tips here!"
              name="tip"
              id="tip"
              cols={50}
              rows={6}
              value={textArea}
              onChange={(e) => {
                setTextArea(e.target.value);
              }}
            ></textarea>
            <button>add</button>
          </form>
        </>
      )}

      <div className="community-tip-list"></div>
    </div>
  );
};

export default CommunityTips;