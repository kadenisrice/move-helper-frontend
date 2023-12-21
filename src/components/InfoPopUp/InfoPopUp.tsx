import "./InfoPopUp.css";

interface Props {
  info: string[];
}

const InfoPopUp = ({ info }: Props) => {
  return (
    <div className="InfoPopUp">
      <ul className="info-ul">
        {info.map((info, index) => {
          return (
            <li key={index}>
              <p>{info}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default InfoPopUp;
