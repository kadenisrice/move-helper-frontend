import { useContext, useEffect, useState } from "react";
import "./AccountSetup.css";
import AuthContext from "../../context/AuthContext";
import AccountForm from "../AccountForm/AccountForm";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import dogInABox from "../../assets/photo-1520038410233-7141be7e6f97.avif";
import movingTruck1 from "../../assets/photo-1600518464441-9154a4dea21b.avif";
import movingTruck2 from "../../assets/photo-1601656125693-aac12521664f.avif";
import boxes from "../../assets/photo-1624137527136-66e631bdaa0e.avif";
import movingTruck3 from "../../assets/moving-photo-5.jpg";
import manTrampleBoxes from "../../assets/man-trampled-boxes.jpg";
import manWomanBox from "../../assets/man-woman-box.jpg";
import manWomanCar from "../../assets/man-woman-car.jpg";
import womanSurroundedBoxes from "../../assets/woman-surrounded-boxes.jpg";
import womanTapingBox from "../../assets/woman-taping-box.jpg";

import box1 from "../../assets/box-1.jpg";
import box2 from "../../assets/box-2.jpg";
import box3 from "../../assets/box-3.jpg";
import box4 from "../../assets/box-4.jpg";
import box5 from "../../assets/box-5.jpg";

const AccountSetup = () => {
  const { user, account } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setShowForm(true);
    }
    if (account && user && account.toAddress.state) {
      setShowForm(false);
      navigate("/dashboard");
    }
  }, [user, account]);

  const settings1 = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 5000,
    cssEase: "linear",
    pauseOnHover: false,
  };
  const settingsMid = {
    dots: false,
    arrows: false,
    rtl: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 5000,
    cssEase: "linear",
    pauseOnHover: false,
  };

  return (
    <div className="AccountSetup">
      {showForm && <AccountForm setShowForm={setShowForm} />}

      {!user && (
        <div className="landing-page">
          <h2>Let CargoCompanion do all the work for you</h2>
          <p>sign up today!</p>
          <Slider className="stock-photos" {...settings1}>
            <div>
              <img src={dogInABox} alt="dog in a box" />
            </div>

            <div>
              <img src={movingTruck1} alt="moving truck people" />
            </div>

            <div>
              <img src={movingTruck2} alt="friends with moving truck" />
            </div>

            <div>
              <img src={boxes} alt="boxes" />
            </div>

            <div>
              <img src={movingTruck3} alt="moving truck 3" />
            </div>

            <div>
              <img src={dogInABox} alt="dog in a box" />
            </div>

            <div>
              <img src={movingTruck1} alt="moving truck people" />
            </div>

            <div>
              <img src={movingTruck2} alt="friends with moving truck" />
            </div>

            <div>
              <img src={boxes} alt="boxes" />
            </div>

            <div>
              <img src={movingTruck3} alt="moving truck 3" />
            </div>
          </Slider>

          <Slider className="stock-photos-mid" {...settingsMid}>
            <div>
              <img src={manTrampleBoxes} alt="dog in a box" />
            </div>

            <div>
              <img src={manWomanBox} alt="moving truck people" />
            </div>

            <div>
              <img src={womanSurroundedBoxes} alt="boxes" />
            </div>

            <div>
              <img src={womanTapingBox} alt="boxes" />
            </div>

            <div>
              <img src={manWomanCar} alt="friends with moving truck" />
            </div>

            <div>
              <img src={manTrampleBoxes} alt="dog in a box" />
            </div>

            <div>
              <img src={manWomanBox} alt="moving truck people" />
            </div>

            <div>
              <img src={womanSurroundedBoxes} alt="boxes" />
            </div>

            <div>
              <img src={womanTapingBox} alt="boxes" />
            </div>

            <div>
              <img src={manWomanCar} alt="friends with moving truck" />
            </div>
          </Slider>

          <Slider className="stock-photos-low" {...settings1}>
            <div>
              <img src={box1} alt="dog in a box" />
            </div>

            <div>
              <img src={box2} alt="moving truck people" />
            </div>

            <div>
              <img src={box3} alt="friends with moving truck" />
            </div>

            <div>
              <img src={box4} alt="boxes" />
            </div>

            <div>
              <img src={box5} alt="boxes" />
            </div>
          </Slider>
        </div>
      )}
    </div>
  );
};

export default AccountSetup;
