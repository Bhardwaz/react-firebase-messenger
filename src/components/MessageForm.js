import React from "react";
import Forwardmedia from "../svg/forwardmedia";
import Send from "../svg/send";
import "./MessageForm.css";

const MessageForm = ({ handleSubmit, text, setText, setImg, img }) => {
  return (
    <form className="message_form" onSubmit={handleSubmit}>
      <label htmlFor="img">
        {" "}
        <Forwardmedia img={img} />{" "}
      </label>
      <input
        onChange={(e) => setImg(e.target.files[0])}
        type="file"
        id="img"
        accept="image/"
        style={{ display: "none" }}
      />
      <div>
        <input
          type="text"
          placeholder="type message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div>
        <button className="btn"> Send </button>
      </div>
    </form>
  );
};

export default MessageForm;
