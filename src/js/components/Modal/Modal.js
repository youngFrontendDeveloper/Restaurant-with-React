import React from "react";

function Modal({isMessageSent}) {
  const style = {
    opacity: isMessageSent,
    transition: "opacity 1s linear"
  }

  return (
    <div className="modal" style={style}>
      <p className="modal__text">Ваше сообщение отправлено</p>
    </div>
  );
}

export default Modal;
