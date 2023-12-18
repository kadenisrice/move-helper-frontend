import { FormEvent, useContext, useEffect, useState } from "react";
import "./CommunityTips.css";
import {
  addNewTip,
  deleteTip,
  getAllTips,
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

  const [filter, setFilter] = useState("desc");

  // SUBMIT HANDLER -------------------------------------------------
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (account && account._id) {
      const newTip = {
        uuid: uuidv4(),
        from: account?.displayName,
        fromNickname: account.name ?? "",
        from_id: account._id,
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
    getAllTips(filter).then((res) => {
      setCommunityTips(res);
    });
  }, [filter]);

  const likeHandler = (uuid: string, tip: Tip) => {
    // Check if the tip is already liked by the user
    if (account && account._id) {
      const isLiked = tip.stars.includes(account._id);

      const updatedStars = isLiked
        ? tip.stars.filter((id) => id !== account._id) // Remove like
        : [...tip.stars, account._id];

      const updatedTip = { ...tip, stars: updatedStars };

      updateTipById(uuid, updatedTip).then(() => {
        getAllTips().then((res) => setCommunityTips(res));
      });
    }
  };

  const isItLiked = (tip: Tip) => {
    return tip.stars.some((person) => person === account?._id);
  };

  const deleteTipHandler = (uuid: string) => {
    deleteTip(uuid).then(() => {
      getAllTips().then((res) => setCommunityTips(res));
    });
  };

  return (
    <div className="CommunityTips">
      <h2>Community Tips</h2>
      <button onClick={() => setShowTipForm((prev) => !prev)}>
        Share Your Insight 📌
      </button>
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
            <button>Submit</button>
          </form>
        </>
      )}
      <div className="filter">
        <button onClick={() => setFilter("mostLiked")}>Most Liked</button>
        <button onClick={() => setFilter("desc")}>Newest</button>
        <button onClick={() => setFilter("asc")}>Oldest</button>
      </div>

      <div className="community-tip-list">
        {communityTips.map((tip) => (
          <li key={tip._id} className="tip-item-container">
            <div className="left-column">
              {tip.photoURL ? (
                <img src={tip.photoURL} alt="google photo" />
              ) : (
                <img
                  src={`https://robohash.org/${user?.displayName}?set=set4`}
                />
              )}
            </div>
            <div className="right-column">
              <div className="tip-content">
                <p>"{tip.text}"</p>
                <p>Date: {new Date(tip.date).toISOString().slice(0, 10)}</p>
              </div>
              <div className="tip-actions">
                {account && (
                  <>
                    <i
                      className={`fa-${
                        isItLiked(tip) ? `solid` : `regular`
                      } fa-star`}
                      onClick={() => likeHandler(tip.uuid, tip)}
                    ></i>
                    <span>{tip.stars.length}</span>
                    {tip.from_id === account._id && (
                      <button onClick={() => deleteTipHandler(tip.uuid)}>
                        delete
                      </button>
                    )}
                    <p>
                      From:{" "}
                      {tip.fromNickname === "" ? tip.from : tip.fromNickname}
                    </p>
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default CommunityTips;
