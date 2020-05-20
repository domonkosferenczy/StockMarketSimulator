import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "components/Store/Store";
import Message from "components/Global_Components/Message";

function Messages() {
  const [state] = useContext(StoreContext);
  const [destroyed, setDestroyed] = useState([]);

  const messages = state.message.messages;

  const setDestroyedHandler = (id) => {
    let temp = destroyed;
    temp.push(id);
    setDestroyed(temp);
  };

  let renderedMessages = messages.map((message) => {
    if (!destroyed.includes(message.id)) {
      return (
        <Message
          key={"ME" + message.id}
          message={message}
          setDestroyedHandler={() => setDestroyedHandler(message.id)}
        />
      );
    } else {
      return "";
    }
  });

  // Message doesn't unmount

  return <div className="MessageContainer">{renderedMessages}</div>;
}

export default Messages;
