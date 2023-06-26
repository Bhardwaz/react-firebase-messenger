import React, { useRef, useEffect } from "react";
import Moment from "react-moment";

const Messages = ({ msg, user1 }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [msg]);
  return (
    <div
      className={`message_wrapper ${
        msg.from === user1 ? "sender" : "receiver"
      }`}
      ref={scrollRef}
    >
      <p className={msg.from === user1 ? "me" : "friend"}>
        {msg.media ? <img src={msg.media} alt={msg.text} /> : ""}
        {msg.text}
        <br />
        <small>
          <Moment fromNow>{msg?.createdAt?.toDate()}</Moment>
        </small>
      </p>
    </div>
  );
};

export default Messages;
