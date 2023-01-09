import React from "react";
import style from "./Modal.module.css";
interface Props {
  children: React.ReactNode;
}

function Modal({ children }: Props) {
  const closeModal = (e: React.MouseEvent): void => {
    const modal = document.getElementById("modal");
    modal!.classList.add("hide");
  };
  return (
    <div id="modal" className="hide">
      <div className={style.fade} onClick={closeModal}></div>
      <div className={style.modal}>
        <h2>texto modal</h2>
        {children}
      </div>
    </div>
  );
}

export default Modal;
