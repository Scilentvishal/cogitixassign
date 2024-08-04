import Image from "next/image";
import style from "./Card.module.css";

const Card = ({ data }) => {
  return (
    <div className={`sm:h-48 h-28 rounded-md relative align-middle items-center shadow-2xl w-full ${style.card}`}>
      <div className={style.Charname}>
        {data?.name}
      </div>
      <Image
        src={data?.image}
        fill
        className="object-cover rounded-md"
        alt={data?.name}
      />
    </div>
  );
};

export default Card;
