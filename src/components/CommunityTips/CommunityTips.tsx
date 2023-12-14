import { FormEvent, useContext, useEffect, useState } from "react";
import "./CommunityTips.css";
import {
  addNewTip,
  getAllTips,
  getTipById,
  updateTipById,
} from "../../services/tipsApi";

import { v4 as uuidv4 } from "uuid";
import AuthContext from "../../context/AuthContext";
import Tip from "../../models/Tip";
import { useNavigate } from "react-router-dom";

const CommunityTips = () => {
  const { account, user } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!account || !user) {
      navigate("/");
    }
  }, [user]);

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
        photoURL: user?.photoURL ?? "",
        date: new Date(),
        stars: [],
      };

      await addNewTip(newTip);
    }

    setTextArea("");

    getAllTips().then((res) => setCommunityTips(res));
  };

  useEffect(() => {
    getAllTips().then((res) => setCommunityTips(res));
  }, []);

  const likeHandler = (uuid: string, updatedTip: Tip) => {
    updateTipById(uuid, updatedTip).then(() => {
      getAllTips().then((res) => setCommunityTips(res));
    });
  };

  const isItLiked = (tip: Tip) => {
    return tip.stars.some((person) => person === account?._id);
  };

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
              required
            ></textarea>
            <button>add</button>
          </form>
        </>
      )}

      <div className="community-tip-list">
        {communityTips
          .sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          })
          .map((tip) => (
            <li key={tip._id}>
              <p>From: {tip.from}</p>
              {tip.photoURL ? (
                <img src={tip.photoURL} alt="google photo" />
              ) : (
                <img
                  src={`https://robohash.org/${user?.displayName}?set=set4`}
                />
              )}
              <p>Tip: {tip.text}</p>
              <p>Date: {new Date(tip.date).toISOString().slice(0, 10)}</p>
              <p>stars: {tip.stars.length}</p>

              {account && (
                <i
                  className={`fa-${
                    isItLiked(tip) ? `solid` : `regular`
                  } fa-star`}
                  onClick={() =>
                    likeHandler(tip.uuid, {
                      ...tip,
                      stars: [...tip.stars, account._id!],
                    })
                  }
                ></i>
              )}
            </li>
          ))}
      </div>
    </div>
  );
};

export default CommunityTips;
