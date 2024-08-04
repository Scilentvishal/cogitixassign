import Image from "next/image";
import style from "./Card.module.css";

const Card = ({ data }) => {
  return (
    <div className={`h-48 rounded-md relative align-middle items-center ${style.card}`}>
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
