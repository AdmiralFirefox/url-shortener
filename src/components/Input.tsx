import { useState } from "react";
import styles from "../styles/input/Input.module.scss";

const Input = () => {
  return (
    <div className={styles["input-wrapper"]}>
      <form className={styles["input-content"]}>
        <input type="text" placeholder="Shorten a link here..." />
        <button type="submit">Shorten It!</button>
      </form>
    </div>
  );
};

export default Input;
