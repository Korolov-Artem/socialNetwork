import style from "./loader.module.css";
import React from "react";
import loader from "../../assets/images/loader.svg";

const Loader = (props) => {
  return (
    <div className={style.loader}>
      <img src={loader} />
    </div>
  );
};

export default Loader;
