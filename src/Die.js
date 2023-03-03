import ClassNames from "classnames";
import React from "react";

export default function Die(props) {
  const Buttonstyles = ClassNames(
    "h-12 w-12 shadow-lg rounded-xl flex justify-center items-center cursor-pointer",
    { "bg-green-400": props.isHeld },
    { "bg-white": !props.isHeld }
  );
  return (
    <div className={Buttonstyles} onClick={props.holdDice}>
      <h2 className="text-3xl">{props.value}</h2>
    </div>
  );
}
